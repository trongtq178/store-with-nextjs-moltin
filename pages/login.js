import {Header, Form, Input, Button, Segment} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {login} from '../lib/moltin';
import { Router } from 'next/router';

export default class Register extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    _handleSubmit = async e => {
        e.preventDefault();
        
        const {email, password} = this.state;
        this.setState({
            loading: true
        })

        try{
            const {token} = await register({email, password});
            localStorage.setItem('customerToken', token);
            Router.push('/myaccount');
        }catch(err){
            console.log(err);
            this.setState({
                loading: false
            })
        }
    }

    _handleChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        const {loading} = this.state;
        return (
            <Layout title="Login">
                <Header as="h1">Log in to your account</Header>

                <Form onSubmit={this._handleSubmit} loading={loading}>
                    <Segment>
                        <Form.Field>
                            <label>Email</label>
                            <Input
                                fluid
                                name="email"
                                type="email"
                                autoFocus
                                onChange={e => this._handleChange(e)}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Password</label>
                            <Input
                                fluid
                                name="password"
                                type="password"
                                onChange={e => this._handleChange(e)}
                            />
                        </Form.Field>

                        <Button type="submit" color="orange">
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Layout>
        )
    }
}