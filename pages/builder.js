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
import ResourceListWithProducts from '../components/ResourceList';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      TEXT_FIELD: 'text field',
      BUTTON: 'button',
      DISPLAY_TEXT: 'display text',
      PRODUCTS: 'products'
    }
  }

  TextFieldComponent = () => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: this.ItemTypes.TEXT_FIELD },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    })

    return (
      <div className="component-div">
        <p>Text Field</p>
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
          }}
        >
          <TextField
            value={this.state.title}
          />
        </div>
      </div>
    )
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
            cursor: 'move',
          }}
        >
          <DisplayText size="large">Example Text</DisplayText>
        </div>
      </div>
    )
  }

  ProductsComponent = () => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: this.ItemTypes.PRODUCTS },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    })
    
    return (
      <div className="component-div">
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
          }}
        >
          <p>Products</p>
        </div>
      </div>
    )
  }

  PreviewComponent = () => {
    const [, drop] = useDrop({
      accept: [this.ItemTypes.BUTTON, this.ItemTypes.DISPLAY_TEXT, this.ItemTypes.TEXT_FIELD, this.ItemTypes.PRODUCTS],
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
        <Container className="builder-container">
          <Row>
            <Col className="builder-div">
              <h2>Components</h2>
              <div>
                <this.TextFieldComponent />

                <hr />
                
                <this.ButtonComponent />

                <hr />

                <this.DisplayTextComponent />
              </div>

              <h2>Data</h2>
              <div>
                <this.ProductsComponent />
              </div>  
            </Col>

            <Col>
              <this.PreviewComponent />
            </Col>
          </Row>


        </Container>
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
    let componentsConfig = [...this.state.componentsConfig]

    switch(item.type) {
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

    componentsConfig.push({
      type: item.type
    })

    this.setState({components: components, componentsConfig: componentsConfig})

    let stringifiedComponents = JSON.stringify(componentsConfig)
    store.set("components", stringifiedComponents)
  }
}

export default Builder;