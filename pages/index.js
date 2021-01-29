import { EmptyState, Layout, Page, Button, TextField, DisplayText } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = { open: false };

  render() {
    const emptyState = !store.get('ids');
    const title = store.get('title');
    console.log("IN HERE")
    console.log(store.get('components'))
    const componentsString = store.get('components') || "";
    console.log("COMPONENTS STRING", componentsString)
    const components = this.parseComponents(componentsString);
    console.log("COMPONENTS", components)
    console.log("COMPONENTS", components)
    console.log("STORE", title)

    return (
      <Page>
        <TitleBar
          title="Sample App"
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        <Layout>
          <EmptyState
              heading={title}
              action={{
                content: 'Select products',
                onAction: () => this.setState({ open: true }),
              }}
              image={img}
            >
              { components.map((component) =>  (
                component || <div>None</div>
              ))
            }
            </EmptyState>
        </Layout>
      </Page>
    );
  }

  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false })
    store.set('ids', idsFromResources);
  };

  parseComponents = (componentsString) => {
    let componentsConfig = [];
    try {
      componentsConfig = JSON.parse(componentsString);
    } catch(e) {
      console.log(e);
    }

    this.ItemTypes = {
      TEXT_FIELD: 'text field',
      BUTTON: 'button',
      DISPLAY_TEXT: 'display text',
      PRODUCTS: 'products'
    }

    let components = []
    componentsConfig.forEach((config) => {
      switch(config.type) {
        case this.ItemTypes.TEXT_FIELD:
          components.push(<TextField value={this.state.title} />)
          break;
  
        case this.ItemTypes.BUTTON:
          components.push(<Button>Example button</Button>)
          break;
  
        case this.ItemTypes.DISPLAY_TEXT:
          components.push(<DisplayText size="large">Example Text</DisplayText>)
          break;

        case this.ItemTypes.PRODUCTS:
          components.push(<ResourceListWithProducts />)
          break;
      }
    })

    return components;
  }
}

export default Index;