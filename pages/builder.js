import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  TextStyle,
} from '@shopify/polaris';
import store from 'store-js';

class Builder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "title",
      components: [],
      componentsConfig: []
    }
  }
  
  render() {
    return (
      <div>
        <div className="builder-div">
          <div>
            <p>Text Field</p>
            <TextField
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <p>Button</p>
            <Button onClick={this.addButton}>Example button</Button>
          </div>
        </div>

        <div className="preview-div">
          { this.state.components.map((component) =>  (
              component
            ))
          }
        </div>

      </div>
    );
  }

  handleChange = (value) => {
    console.log(value)
    console.log("STORE", store.get("title"))
    this.setState({title: value})
    store.set("title", value)
  };

  addButton = () => {
    let components = [...this.state.components]
    components.push(<Button onClick={this.addButton}>Example button</Button>)

    let componentsConfig = [...this.state.componentsConfig]
    componentsConfig.push({
      component: "button"
    })

    this.setState({components: components, componentsConfig: componentsConfig})

    let stringifiedComponents = JSON.stringify(componentsConfig)
    store.set("components", stringifiedComponents)
  }
}

export default Builder;