import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

function Notifications() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row>
                  <Col className="ml-auto mr-auto text-start" md="12">
                    <CardTitle tag="h4">Notifications</CardTitle>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notifications;
