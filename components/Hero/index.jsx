import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Hero = (props) => {

    const { InformationData } = props;

    return (
        <div className="section position-relative">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="pr-lg-5">
                            <p className="text-uppercase text-primary font-weight-medium f-14 mb-4"> {InformationData?.header} </p>
                            <h1 className="mb-4 font-weight-normal line-height-1_4">
                                {InformationData?.title} 
                                {/* <span className="text-primary font-weight-medium">Name</span> */}
                            </h1>
                            <p className="text-muted mb-4 pb-2">
                                {InformationData?.description}
                            </p>
                            <a href={InformationData?.ref} className="btn btn-warning">
                                Find Out How <span className="ml-2 right-icon">&#8594;</span>
                            </a>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mt-5 mt-lg-0">
                            <img src="/images/Group Members.png" alt="" className="img-fluid mx-auto d-block" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Hero;
