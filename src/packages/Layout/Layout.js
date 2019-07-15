import create from '../../create/create';
import Head from '../Header/Header';

export default create({
    name: 'layout',
    components: {
      Head,
    },
    render(h) {
      return (
        <div class={'app-wrapper clear'} id={'layout'}>

          <div class={'header-wrapper fl'}>
            <Head>
              {
                this.$slots.header
              }
            </Head>
          </div>

          <div class="sidebar-wrapper">
            {
              this.$slots.sidebar
            }
          </div>

          <div class="page-tabs-wrapper">
            {
              this.$slots['tabs-view']
            }
          </div>
          <section id="overview" class="main-container">
            {
              this.$slots['app-main']
            }
          </section>
        </div>
      );
    },
  },
);

