import create from '../../create/create';
import Head from '../Header/Header';

export default create({
  name: 'layout',
  components: {
    Head,
  },
  render(h) {
    return (
      <div id={'layout'} class={'app-wrapper clear'}>
        <div id={'header-wrapper'} class={'fl'}>
          <Head>{this.$slots.header}</Head>
        </div>

        <div id="side-menu-wrapper">{this.$slots.sidebar}</div>

        <div id="page-tabs-wrapper">{this.$slots['tabs-view']}</div>
        <section id="main-container">{this.$slots['app-main']}</section>
        <div class="other">{this.$slots.other}</div>
      </div>
    );
  },
});
