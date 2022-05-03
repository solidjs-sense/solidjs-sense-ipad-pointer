import MarkdownIt from 'markdown-it';
import { useLocation } from 'solidjs-sense-router';
import readme from '../../../README.md?raw';
import readmeZh from '../../../README-zh.md?raw';
import './usage.scss';
import { bases } from '../constant';

export default () => {
  const md = new MarkdownIt();
  const location = useLocation();
  return (
    <div class="usage-ctn">
      <div class="content" innerHTML={md.render(location.base() === bases[0] ? readmeZh : readme)}></div>
      <div class="buttons">
        <button data-ipad-pointer>Morph default</button>
        <button data-ipad-pointer="lift">lift</button>
        <button data-ipad-pointer="noParallax">noParallax</button>
        <button data-ipad-pointer="noPadding">noPadding</button>
      </div>
    </div>
  );
};
