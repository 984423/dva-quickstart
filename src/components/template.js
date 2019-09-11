import React from 'react';
import {Flex, DatePicker,Button, Card, WingBlank, WhiteSpace,Icon, Grid,NavBar, } from 'antd-mobile';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

const WhiteSpaceExample = () => (
  <div>
    <WhiteSpace size="xs" />
    <PlaceHolder />

    <WhiteSpace size="sm" />
    <PlaceHolder />

    <WhiteSpace />
    <PlaceHolder />

    <WhiteSpace size="lg" />
    <PlaceHolder />

    <WhiteSpace size="xl" />
    <PlaceHolder />
  </div>
);


const Example = () => {
  return (
    <div>
      Example
    </div>
  );
};

Example.propTypes = {
};

export default Example;



