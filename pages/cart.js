import Layout from '../components/Layout';
import {getCartItems, removeFromCart, checkoutCart, payForOrder} from '../lib/moltin';
import CartItemList from '../components/CartItemList';
import CartSummary from '../components/CartSummary';
export default class Cart extends React.Component {
    state = {
        items: [],
        loading: true,
        completed: false
    }

    async componentDidMount() {
        const cartId = await localStorage.getItem('mcart');
        const { data, meta } = await getCartItems(cartId)
        
        this.setState({
            items: data,
            meta,
            cartId,
            loading: false
        })
    }

    _handleCheckout = async data => {
        const cartId = await localStorage.getItem('mcart');

        const {id: token, email, card: {
            name,
            address_line1: line_1,
            address_city: city,
            address_country: country,
            address_state: county,
            address_zip: postcode
        }} = data;

        const customer = {
            name,
            email
        }

        const address = {
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1],
            line_1,
            city,
            country,
            county,
            postcode
        }

        try{
            const {data: {id}} = await checkoutCart(cartId, customer, address);
            await payForOrder(id, token, email);

            this.setState({
                completed: true
            })
        }catch(err){
            console.log(err);
        }
    }

    _handleRemoveFromCart = async itemId => {
        const {cartId} = this.state;
        const {data, meta} = await removeFromCart(itemId, cartId);

        this.setState({
            items: data,
            meta
        })
    }

    render() {
        const {meta, ...rest} = this.state;
        const { loading } = rest;
        return (
            <Layout title="Cart">
                <CartItemList {...rest} removeFromCart={this._handleRemoveFromCart}/>
                {!loading && !rest.completed && <CartSummary {...meta} handleCheckout={this._handleCheckout}/>}
            </Layout>
        )
    }
}