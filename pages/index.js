import { EmptyState, Layout, Page, Button } from '@shopify/polaris';
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
        {emptyState ? (
          <Layout>
            <EmptyState
                heading={title}
                action={{
                  content: 'Select products',
                  onAction: () => this.setState({ open: true }),
                }}
                image={img}
              >
                <p>Select products to change their price temporarily.</p>

                { components.map((component) =>  (
                  component || <div>None</div>
                ))
              }
              </EmptyState>
          </Layout>
        ) : (
          <ResourceListWithProducts />
        )}
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

    let components = []
    componentsConfig.forEach((config) => {
      if (config.component == "button") {
        components.push(<Button onClick={this.addButton}>Example button</Button>);
      }
    })

    return components;
  }
}

export default Index;