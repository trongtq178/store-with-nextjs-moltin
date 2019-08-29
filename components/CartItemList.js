import Link from 'next/link';
import {Item, Loader, Button, Message} from 'semantic-ui-react';
import { removeFromCart } from '../lib/moltin';

export default ({items, removeFromCart, loading, completed}) => {
    if(loading) return <Loader active inline="centered"/>

    if(completed){
        return (
            <Message success>
                <Message.Header>Order placed!</Message.Header>
                <p>Congratulations. You accepted your first payment with Stripe + Moltin!</p>
            </Message>
        )
    }

    if(items.length === 0){
        return (
            <Message warning>
                <Message.Header>Your cart is empty</Message.Header>
                <p>You'll need to add some items to the cart before you checkout.</p>
            </Message>
        )
    }

    const mapCartItemsToItems = items => items.map(({id, product_id, name, quantity, meta}) => {
        const price = meta.display_price.with_tax.unit.formatted || null;

        return {
            childKey: id,
            header: (
                <Link href={`/product?id=${product_id}`} passHref>
                    <Item.Header as="a">{name}</Item.Header>
                </Link>
            ),
            meta: `${quantity} x ${price}`,
            extra: (
                <Button 
                    basic
                    icon="remove"
                    floated="right"
                    onClick={() => removeFromCart(id)}
                />
            )
        }
    })
    return <Item.Group divided items={mapCartItemsToItems(items)}/>
}