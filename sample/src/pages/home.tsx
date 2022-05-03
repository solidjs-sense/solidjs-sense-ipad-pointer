import { t } from '../util';
import './home.scss';

export default () => {
  return (
    <div class="home-ctn">
      <div class="content">
        <h1>{t('SolidJS iPad Pointer')}</h1>
        <p>{t('implement')}</p>
      </div>
    </div>
  );
};
