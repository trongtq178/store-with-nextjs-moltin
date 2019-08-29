import {Input, Button, Label} from 'semantic-ui-react';
import {addToCart} from '../lib/moltin';

export default class AddToCart extends React.Component {
    state = {
        loading: false,
        quantity: 1
    }

    _handChange = ({target: {value}}) => {
        this.setState({
            quantity: value
        });
    }

    _handleSubmit = async () => {
        const {productId} = this.props;
        const {quantity} = this.state;

        this.setState({
            loading: true
        });

        try{
            await addToCart(productId, quantity);
        }catch(error){
            console.log(error);
        }
        
        this.setState({
            loading: false,
            quantity: 1
        });
    }

    render() {
        const {loading, quantity} = this.state;

        return (
            <Input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={e => this._handChange(e)}
                action={{
                    color: "orange",
                    content: "Add to Cart",
                    icon: 'plus cart',
                    onClick: this._handleSubmit,
                    loading,
                    disabled: loading
                }}
            />
        );
    }
}