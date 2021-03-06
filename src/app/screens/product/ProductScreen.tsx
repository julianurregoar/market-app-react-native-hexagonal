import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Page} from "../../components/styled/Page";
import {SafeArea} from "../../components/SafeArea";
import styled from "styled-components/native";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../../Main";
import {RouteProp} from '@react-navigation/native';
import AppContext from "../../AppContext";
import {Product} from "../../../core/product/domain/Product";
import {OnScreenRenderPresenter} from "./OnScreenRenderPresenter";
import {ProductView} from "./ProductView";
import {ProductButton} from "./components/ProductButton";

type ProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Product'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;

type ProductScreenProps = {
    navigation: ProductScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

const ProductScreen = (props: ProductScreenProps) => {
    const appContext = useContext(AppContext);

    const [product, setProduct] = useState<Product>();

    const view: ProductView = {
        showProduct: setProduct
    };

    const onScreenRenderPresenter = new OnScreenRenderPresenter(view, appContext.provider.findProductById);

    useEffect(() => {
        onScreenRenderPresenter.handle(props.route.params.productId);
    }, []);

    return (
        <Page>
            {product &&
                <>
                    <ProductImage source={{uri: product.images[0]}} />
                    <SafeArea>
                        <ProductContent>
                            <ProductScroll>
                                <ProductLocation>Chennai, India,  2h ago</ProductLocation>
                                <ProductTitleContainer>
                                    <ProductTitleLabel>{product.title.value}</ProductTitleLabel>
                                    <ProductValueContainer>
                                        <ProductValueSign>$</ProductValueSign>
                                        <ProductValueValue>{product.value.value}</ProductValueValue>
                                    </ProductValueContainer>
                                </ProductTitleContainer>
                                <ProductLineSeparator />
                                <ProductDescription>{product.description.value}</ProductDescription>
                                <ProductLineSeparator />
                            </ProductScroll>
                            <ProductFooter>
                                <ProductSellerContainer></ProductSellerContainer>
                                <ProductButton label="Message" />
                                <ProductButton label='Buy Now' dark />
                            </ProductFooter>

                        </ProductContent>
                    </SafeArea>
                </>
            }
        </Page>
    );
};

export default ProductScreen;

const ProductScroll = styled.ScrollView`
    padding: 20px;
`;

const ProductContent = styled.View`
    flex: 1;
    justify-content: space-between;
`;


const ProductImage = styled.Image`
    height: 50%;
`;

const ProductLocation= styled.Text`
    color: #A9A9B0;
    font-size: 12px;
`;

const ProductTitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 13px;
`;

const ProductTitleLabel = styled.Text`
    color: #3B3B3B;
    font-size: 24px;
    font-weight: bold;
`;

const ProductValueContainer = styled.View`
    flex-direction: row;
`;

const ProductLineSeparator = styled.View`
    height: 1px;
    width: 100%;
    background-color: #979797;
    margin-top: 21px;
    margin-bottom: 21px;
    opacity: 0.1;
`;

const ProductValueSign = styled.Text`
    color: #3B3B3B;
    font-size: 10px;
    font-weight: bold;
`;

const ProductValueValue = styled.Text`
    color: #3B3B3B;
    font-size: 24px;
    font-weight: bold;
`;

const ProductDescription = styled.Text`
    color: #A9A9B0;
    font-size: 12px;
`;


const ProductFooter = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

const ProductSellerContainer = styled.View`
    background-color: #A9A9B0;
    height: 30px;
`;


