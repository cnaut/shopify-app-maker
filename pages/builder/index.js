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
    this.state = {title: "title"}
  }
  
  render() {
    return (
      <div>
        <TextField
          value={this.state.title}
          label="title"
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleChange = (value) => {
    console.log(value)
    console.log("STORE", store.get("title"))
    this.setState({title: value})
    store.set("title", value)
  };

}

export default Builder;