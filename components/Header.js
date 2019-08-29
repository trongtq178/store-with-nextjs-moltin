import Link from 'next/link';
import {Menu, Container, Image} from 'semantic-ui-react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouterChangeStart = url => NProgress.start();
Router.onRouterChangeComplete = url => NProgress.done();
Router.onRouterChangeError = url => NProgress.done();

export default () => (
    <React.Fragment>
        <Head>
            <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <Menu inverted fixed='top' size='huge'>
            <Container text>
            <Link href='/' prefetch passHref>
                <Menu.Item as='a' header>
                    <Image
                        size='mini'
                        src='../static/moltin-light-hex.png'
                        style={{marginRight: '1.5em'}}
                    />
                    Nextjs Store
                </Menu.Item>
            </Link>

            <Link href='/register' prefetch passHref>
                <Menu.Item as='a'>
                    Sign up
                </Menu.Item>
            </Link>

            <Link href='/login' prefetch passHref>
                <Menu.Item as='a'>
                    Sign in
                </Menu.Item>
            </Link>

            <Link href='/cart' prefetch passHref>
                <Menu.Item position="right" as='a' header>
                    Cart
                </Menu.Item>
            </Link>
            </Container>
        </Menu>
    </React.Fragment>
)