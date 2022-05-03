import { Portal } from 'solid-js/web';
import { setStyles } from './chunks';
import { mergeProps, onCleanup, onMount } from 'solid-js';
import contextMode from './modes/contextMode';
import { CProps } from './types';

export const IpadPointer = (props: Partial<CProps> & { hideOriginCursor?: boolean }) => {
  let refCursor: HTMLDivElement | undefined;
  const clearCbs: (() => void)[] = [];

  // Default props
  const defaultProps = mergeProps(
    {
      radius: 20,
      transitionSpeed: 0.2,
      parallaxIndex: 10,
      hoverPadding: 6,
      hideCursorOutside: false,
    },
    props,
  );

  onMount(() => {
    if (!refCursor || typeof window === 'undefined') {
      return;
    }
    clearCbs.push(
      // Set base
      setStyles(props.hideOriginCursor),
      // Load mode when page is loaded
      contextMode(refCursor, defaultProps!),
    );
  });

  onCleanup(() => {
    if (!clearCbs.length) {
      return;
    }
    clearCbs.forEach((cb) => cb());
  });

  return (
    <Portal>
      <div
        ref={refCursor}
        class="ipad-pointer"
        style={{
          transform: 'translate(-200px, -200px)',
          height: `${defaultProps.radius}px`,
          width: `${defaultProps.radius}px`,
          left: 0,
          top: 0,
          opacity: defaultProps.hideCursorOutside ? 0 : 1,
        }}
      ></div>
    </Portal>
  );
};
