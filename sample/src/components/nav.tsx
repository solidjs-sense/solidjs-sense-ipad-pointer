import { Link, useLocation, useNavigator } from 'solidjs-sense-router';
import { bases } from '../constant';
import { t } from '../util';
import './nav.scss';

export const Nav = () => {
  const location = useLocation();
  const navigator = useNavigator();

  const changeBase = () => {
    navigator.newBase(location.base() === bases[0] ? bases[1] : bases[0]);
  };

  return (
    <nav class="nav-ctn">
      <Link href="/" data-ipad-pointer activeClass="active">
        {t('home')}
      </Link>
      <Link href="/usage" data-ipad-pointer activeClass="active">
        {t('usage')}
      </Link>
      <a
        href="https://github.com/solidjs-sense/solidjs-sense-ipad-pointer/tree/master/sample"
        data-ipad-pointer
        target="_blank"
      >
        {t('sample')}
      </a>
      <a href="https://github.com/solidjs-sense/solidjs-sense-ipad-pointer" data-ipad-pointer target="_blank">
        Github
      </a>
      <div class="right">
        <button data-ipad-pointer onclick={changeBase}>
          {location.base() === '/zh' ? '中文/English' : 'English/中文'}
        </button>
      </div>
    </nav>
  );
};
