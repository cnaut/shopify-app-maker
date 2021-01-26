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
  DisplayText
} from '@shopify/polaris';
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import store from 'store-js';

class Builder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "title",
      components: [],
      componentsConfig: []
    }

    this.ItemTypes = {
      BUTTON: 'button',
      DISPLAY_TEXT: 'display text'
    }
  }

  ButtonComponent = () => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: this.ItemTypes.BUTTON },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    })
    
    return (
      <div className="component-div">
        <p>Button</p>
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
        >
          <Button>
            Example button
          </Button>
        </div>

      </div>
    )
  }

  DisplayTextComponent = () => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: this.ItemTypes.DISPLAY_TEXT },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    })
    
    return (
      <div className="component-div">
        <p>Display Text</p>
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
        >
          <DisplayText size="large">Example Text</DisplayText>
        </div>
      </div>
    )
  }

  PreviewComponent = () => {
    const [, drop] = useDrop({
      accept: [this.ItemTypes.BUTTON, this.ItemTypes.DISPLAY_TEXT],
      drop: (item, monitor) => this.addComponent(item, monitor)
    })

    return (
      <div
        ref={drop}
        className="preview-div"
      >
        { this.state.components.map((component) =>  (
            component
          ))
        }
      </div>
    );
  }
  
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="builder-container">
          <div className="builder-div">
            <h2>Components</h2>
            
            <div className="component-div">
              <p>Text Field</p>
              <TextField
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>

            <hr />
            
            <this.ButtonComponent />

            <hr />

            <this.DisplayTextComponent />
          </div>

          <this.PreviewComponent />

        </div>
      </DndProvider>
    );
  }

  handleChange = (value) => {
    console.log(value)
    console.log("STORE", store.get("title"))
    this.setState({title: value})
    store.set("title", value)
  };

  addComponent = (item, monitor) => {
    let components = [...this.state.components]

    switch(item.type) {
      case this.ItemTypes.BUTTON:
        components.push(<Button>Example button</Button>)
        break;

      case this.ItemTypes.DISPLAY_TEXT:
        components.push(<DisplayText size="large">Example Text</DisplayText>)
        break;
    }
    
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