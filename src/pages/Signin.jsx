import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Col, Panel, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const Signin = () => {
    const signInWithProvider = async provider => {
        try {
            const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

            
            if(additionalUserInfo.isNewUser){
                // profile/user.id is the place where we store the user info
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    email: user.email,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                });
            }

           
            Alert.success('Signin successfully', 30000);
        } catch (err) {
            Alert.info(err.message, 30000);
        }
    };

    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider());
    };

    const onGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider());
    };

    return (
        <Container>
            <Grid className="mt-page">
                <Col xs={24} md={12} mdOffset={6}>
                    <Panel>
                        <div className="text-center">
                            <h2>Baat Cheet</h2>
                            <p>dosto ki virtual BAITHAK</p>
                        </div>
                        <div className="mt-2">
                            <Button
                                block
                                color="blue"
                                onClick={onFacebookSignIn}
                            >
                                <Icon icon="facebook" />
                                <span className="pl-2">
                                    Continue with Facebook
                                </span>
                            </Button>
                            <Button
                                block
                                color="green"
                                onClick={onGoogleSignIn}
                            >
                                <Icon icon="google" />
                                <span className="pl-2">
                                    Continue with Google
                                </span>
                            </Button>
                        </div>
                    </Panel>
                </Col>
            </Grid>
        </Container>
    );
};

export default Signin;
