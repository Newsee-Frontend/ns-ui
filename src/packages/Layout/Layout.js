import create from '../../utils/create';
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

          <div class="main-container">

            {
              this.$slots['tabs-view']
            }

            <section id="overview" class="app-main">
              {
                this.$slots['app-main']
              }
            </section>
          </div>

        </div>
      );
    },
  },
);

