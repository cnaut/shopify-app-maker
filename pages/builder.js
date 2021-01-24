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
      components: []
    }
  }
  
  render() {
    return (
      <div>
        <div className="builder-div">
          <TextField
            value={this.state.title}
            label="title"
            onChange={this.handleChange}
          />

          <Button onClick={this.addButton}>Example button</Button>
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
    this.setState({components: components})
  }
}

export default Builder;