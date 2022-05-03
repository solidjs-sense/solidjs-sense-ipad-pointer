import { gsap } from 'gsap';
import { getMoveIndex, isElHasProperty, getStyleProp } from '../chunks';
import propNames from '../propNames';
import { CProps } from '../types';

const contextMode = (cursor: HTMLElement, props: CProps) => {
  const parallaxSpeed = {
    cursor: props.parallaxIndex,
    target: props.parallaxIndex * 1.5,
  };
  let isHovered = false;
  let cursorTarget: HTMLElement | undefined;

  const moveCursor = (e: MouseEvent) => {
    // If element is not hovered
    if (!isHovered) {
      return gsap.to(cursor, {
        duration: props.transitionSpeed,
        x: e.clientX - props.radius / 2,
        y: e.clientY - props.radius / 2,
      });
      // If element is hovered
    } else if (cursorTarget) {
      const borderRadius = Number(window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any);
      // For "LIFT" mode
      if (isElHasProperty(cursorTarget, propNames.lift)) {
        gsap.to(cursorTarget, {
          duration: props.transitionSpeed,
          x: getMoveIndex(
            e.clientX,
            cursorTarget.getBoundingClientRect().left,
            cursorTarget.clientWidth,
            parallaxSpeed.target,
          ),
          y: getMoveIndex(
            e.clientY,
            cursorTarget.getBoundingClientRect().top,
            cursorTarget.clientHeight,
            parallaxSpeed.target,
          ),
          scale: 1.1,
          boxShadow: getStyleProp('--ghost-shadow'),
        });
        gsap.to(cursor, {
          duration: props.transitionSpeed,
          filter: 'blur(8px)',
          x:
            cursorTarget.getBoundingClientRect().left +
            (e.clientX - cursorTarget.getBoundingClientRect().left - cursorTarget.clientWidth / 2) /
              parallaxSpeed.cursor,
          y:
            cursorTarget.getBoundingClientRect().top +
            (e.clientY - cursorTarget.getBoundingClientRect().top - cursorTarget.clientHeight / 2) /
              parallaxSpeed.cursor,
          backgroundImage: `radial-gradient(circle at ${e.clientX - cursorTarget.getBoundingClientRect().left}px ${
            e.clientY - cursorTarget.getBoundingClientRect().top
          }px, rgba(255,255,255,0.4), rgba(255,255,255,0))`,
        });
        // For default "PARALLAX" mode
      } else {
        gsap.to(cursor, {
          duration: props.transitionSpeed,
          x:
            cursorTarget.getBoundingClientRect().left -
            (isElHasProperty(cursorTarget, propNames.noPadding) ? 0 : props.hoverPadding) +
            (isElHasProperty(cursorTarget, propNames.noParallax)
              ? 0
              : (e.clientX - cursorTarget.getBoundingClientRect().left - cursorTarget.clientWidth / 2) /
                parallaxSpeed.cursor),
          y:
            cursorTarget.getBoundingClientRect().top -
            (isElHasProperty(cursorTarget, propNames.noPadding) ? 0 : props.hoverPadding) +
            (isElHasProperty(cursorTarget, propNames.noParallax)
              ? 0
              : (e.clientY - cursorTarget.getBoundingClientRect().top - cursorTarget.clientHeight / 2) /
                parallaxSpeed.cursor),
          borderRadius: borderRadius * (isElHasProperty(cursorTarget, propNames.noPadding) ? 1 : 1.5),
          width:
            cursorTarget.clientWidth +
            (isElHasProperty(cursorTarget, propNames.noPadding) ? 0 : props.hoverPadding * 2),
          height:
            cursorTarget.clientHeight +
            (isElHasProperty(cursorTarget, propNames.noPadding) ? 0 : props.hoverPadding * 2),
        });
        // For "NO PARALLAX" property
        if (!isElHasProperty(cursorTarget, propNames.noParallax)) {
          gsap.to(cursorTarget, {
            duration: props.transitionSpeed,
            x: -getMoveIndex(
              e.clientX,
              cursorTarget.getBoundingClientRect().left,
              cursorTarget.clientWidth,
              parallaxSpeed.target,
            ),
            y: -getMoveIndex(
              e.clientY,
              cursorTarget.getBoundingClientRect().top,
              cursorTarget.clientHeight,
              parallaxSpeed.target,
            ),
          });
        }
      }
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    isHovered = true;
    cursorTarget = e.target as HTMLElement;
    const borderRadius = Number(window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any);

    if (isElHasProperty(cursorTarget, propNames.lift)) {
      cursor.classList.add('ipad-pointer-lift-active');
      gsap.to(cursor, {
        duration: props.transitionSpeed,
        borderRadius: borderRadius,
        width: cursorTarget.clientWidth,
        height: cursorTarget.clientHeight,
        scale: 1.1,
      });
    } else {
      cursor.classList.add('ipad-pointer-active');
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    isHovered = false;
    cursor.classList.remove('ipad-pointer-active');
    cursor.classList.remove('ipad-pointer-lift-active');

    gsap.to(cursor, {
      duration: props.transitionSpeed,
      x: e.clientX - props.radius / 2,
      y: e.clientY - props.radius / 2,
      width: props.radius,
      height: props.radius,
      borderRadius: '100px',
      scale: 1,
      backgroundImage: 'none',
      filter: 'blur(0px)',
    });
    if (cursorTarget) {
      gsap.to(cursorTarget, {
        duration: props.transitionSpeed,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: '0 7px 15px rgba(0,0,0,0.0)',
      });
    }
  };

  // Event listeners
  document.addEventListener('wheel', handleMouseOut);

  document.addEventListener('mousemove', moveCursor);

  const mouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!isElHasProperty(target)) {
      return;
    }
    handleMouseOver(e);
  };

  document.addEventListener('mouseenter', mouseEnter, true);

  const mouseLeave = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!isElHasProperty(target)) {
      return;
    }
    handleMouseOut(e);
  };

  document.addEventListener('mouseleave', mouseLeave, true);

  return () => {
    document.removeEventListener('wheel', handleMouseOut);
    document.removeEventListener('mousemove', moveCursor);
    document.removeEventListener('mouseenter', mouseEnter, true);
    document.removeEventListener('mouseleave', mouseLeave, true);
  };
};

export default contextMode;
