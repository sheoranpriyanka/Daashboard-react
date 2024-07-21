import LineChart from "components/chart/lineChart";
import ChartComponent from "components/chart/pieChart";
import DateSelector from "components/DateComponent/DateSelector";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { CommonService } from "service";

function Dashboard() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(states?.[0] ?? "");
  const [minFromDate, setMinFromDate] = useState(null);
  const [maxFromDate, setMaxFromDate] = useState(null);
  const [minToDate, setMinToDate] = useState(null);
  const [maxToDate, setMaxToDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [salesData, setSalesData] = useState({});
  const [salesDataByCity, setSalesDataByCity] = useState([]);
  const [salesDataBySegment, setSalesDataBySegment] = useState([]);
  const [salesDataByCategory, setSalesDataByCategory] = useState([]);
  const [salesDataByProduct, setSalesDataByProduct] = useState([]);
  const [salesDataBySubCategory, setSalesDataBySubCategory] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await CommonService("states", "get");
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    if (selectedState) {
      const fetchStateDates = async () => {
        try {
          const response = await CommonService(
            `state-dates/dates?state=${selectedState}`,
            "get"
          );
          const { minOrderDate, maxOrderDate, minShipDate, maxShipDate } =
            response.data;

          setMinFromDate(new Date(minOrderDate));
          setMaxFromDate(new Date(maxOrderDate));
          setMinToDate(new Date(minShipDate));
          setMaxToDate(new Date(maxShipDate));
        } catch (error) {
          console.error("Error fetching state dates:", error);
        }
      };

      fetchStateDates();
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedToDate && selectedFromDate) {
      fetchTotalSales();
      fetchSalesByCity();
      fetchSalesByCategory();
      fetchSalesBySegment();
      fetchSalesBySubCategory();
      fetchSalesByProduct();
    }
  }, [selectedState, selectedToDate, selectedFromDate]);

  const fetchTotalSales = async () => {
    if (!selectedState && !selectedToDate && !selectedFromDate) {
      alert("Please provide state, min date, and max date");
      return;
    }

    try {
      const response = await CommonService(
        `totalDetail/sum?state=${selectedState}&fromDate=${
          selectedFromDate.toISOString().split("T")[0]
        }&toDate=${selectedToDate.toISOString().split("T")[0]}`,
        "get"
      );
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const fetchSalesByCity = async () => {
    if (!selectedState && !selectedToDate && !selectedFromDate) {
      alert("Please provide state, min date, and max date");
      return;
    }

    try {
      const response = await CommonService(
        `totalDetail/sales-by-city?state=${selectedState}&fromDate=${
          selectedFromDate.toISOString().split("T")[0]
        }&toDate=${selectedToDate.toISOString().split("T")[0]}`,
        "get"
      );
      setSalesDataByCity(response.data);
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const fetchSalesBySegment = async () => {
    if (!selectedState && !selectedToDate && !selectedFromDate) {
      alert("Please provide state, min date, and max date");
      return;
    }

    try {
      const response = await CommonService(
        `totalDetail/sales-by-segment?state=${selectedState}&fromDate=${
          selectedFromDate.toISOString().split("T")[0]
        }&toDate=${selectedToDate.toISOString().split("T")[0]}`,
        "get"
      );
      setSalesDataBySegment(
        response?.data?.map((v) => ({ name: v.segment, value: v.sales }))
      );
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const fetchSalesByCategory = async () => {
    if (!selectedState && !selectedToDate && !selectedFromDate) {
      alert("Please provide state, min date, and max date");
      return;
    }

    try {
      const response = await CommonService(
        `totalDetail/sales-by-category?state=${selectedState}&fromDate=${
          selectedFromDate.toISOString().split("T")[0]
        }&toDate=${selectedToDate.toISOString().split("T")[0]}`,
        "get"
      );
      setSalesDataByCategory(
        response?.data?.map((v) => ({ name: v.category, value: v.sales }))
      );
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const fetchSalesBySubCategory = async () => {
    if (!selectedState && !selectedToDate && !selectedFromDate) {
      alert("Please provide state, min date, and max date");
      return;
    }

    try {
      const response = await CommonService(
        `totalDetail/sales-by-sub-category?state=${selectedState}&fromDate=${
          selectedFromDate.toISOString().split("T")[0]
        }&toDate=${selectedToDate.toISOString().split("T")[0]}`,
        "get"
      );
      setSalesDataBySubCategory(response?.data);
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const fetchSalesByProduct = async () => {
    if (!selectedState && !selectedToDate && !selectedFromDate) {
      alert("Please provide state, min date, and max date");
      return;
    }

    try {
      const response = await CommonService(
        `totalDetail/sales-by-product?state=${selectedState}&fromDate=${
          selectedFromDate.toISOString().split("T")[0]
        }&toDate=${selectedToDate.toISOString().split("T")[0]}`,
        "get"
      );
      setSalesDataByProduct(response?.data);
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <BackgroundColorContext.Consumer>
      {({ color = "darkBlue", changeColor }) => (
        <div className="content" data={color ?? "darkBlue"}>
          <Row>
            <Col className="text-left" sm="3">
              <CardTitle
                tag="h4"
                style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
              >
                Sales Overview
              </CardTitle>
            </Col>
            <Col sm="3">
              <label htmlFor="state-select">Select a state</label>
              <select
                id="state-select"
                value={selectedState}
                onChange={handleStateChange}
                className="form-control"
              >
                <option value="" disabled>
                  Select a state
                </option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </Col>
            <Col sm="3">
              <label htmlFor="state-select">Select From date</label>
              <DateSelector
                minDate={minFromDate}
                maxDate={maxFromDate}
                selectedDate={selectedFromDate}
                onDateChange={(date) => setSelectedFromDate(date)}
                placeholderText={"Select From date"}
              />
            </Col>
            <Col sm="3">
              <label htmlFor="state-select">Select To date</label>
              <DateSelector
                minDate={minToDate}
                maxDate={maxToDate}
                selectedDate={selectedToDate}
                onDateChange={(date) => setSelectedToDate(date)}
                placeholderText={"Select To date"}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="3">
              <Card className="card-chart">
                <CardHeader style={{ display: "flex", flex: 1 }}>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM30 56C15.66 56 4 44.34 4 30C4 15.66 15.66 4 30 4C44.34 4 56 15.66 56 30C56 44.34 44.34 56 30 56Z"
                      fill="#64C86E"
                    />
                    <path
                      d="M44 16H38.24C39.02 17.06 39.58 18.38 39.82 20H44V24H39.82C38.84 30.28 33.14 32 30 32H22.82L39.42 48.58L36.58 51.42L16.58 31.42C16.02 30.84 15.84 29.98 16.16 29.24C16.46 28.48 17.2 28 18 28H30C30.86 27.98 34.72 27.72 35.74 24H16V20H35.74C34.72 16.28 30.86 16.02 29.98 16H16V12H44V16Z"
                      fill="#64C86E"
                    />
                  </svg>

                  <div style={{ marginLeft: "20px" }}>
                    <h5
                      className="card-category"
                      style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                    >
                      Total Sales
                    </h5>
                    <CardTitle tag="h3">
                      $
                      {salesData?.totalSales
                        ? Number(salesData?.totalSales?.toFixed(1))
                        : 0}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart">
                <CardHeader style={{ display: "flex", flex: 1 }}>
                  <svg
                    width="60"
                    height="38"
                    viewBox="0 0 60 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M56.25 3.75V33.75H3.75V3.75H56.25ZM60 0H0V37.5H60V0Z"
                      fill="#2296CE"
                    />
                    <path d="M22.5 7.5H7.5V11.25H22.5V7.5Z" fill="#2296CE" />
                    <path d="M52.5 7.5H48.75V11.25H52.5V7.5Z" fill="#2296CE" />
                    <path d="M45 7.5H41.25V11.25H45V7.5Z" fill="#2296CE" />
                    <path d="M37.5 7.5H33.75V11.25H37.5V7.5Z" fill="#2296CE" />
                    <path d="M48.75 15H7.5V18.75H48.75V15Z" fill="#2296CE" />
                    <path d="M52.5 26.25H37.5V30H52.5V26.25Z" fill="#2296CE" />
                  </svg>

                  <div style={{ marginLeft: "20px" }}>
                    <h5
                      className="card-category"
                      style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                    >
                      Quantity Sold
                    </h5>
                    <CardTitle tag="h3">
                      {salesData?.totalQuantity ?? 0}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart">
                <CardHeader style={{ display: "flex", flex: 1 }}>
                  <svg
                    width="60"
                    height="56"
                    viewBox="0 0 60 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36 24V28H60V24H55.38L49.38 8H56V4H36V0H24V4H4V8H10.62L4.62 24H0V28H24V24H19.38L13.38 8H24V12H28V52H20V56H40V52H32V12H36V8H46.62L40.62 24H36ZM15.12 24H8.88L12 15.7L15.12 24ZM32 8H28V4H32V8ZM48 15.7L51.12 24H44.88L48 15.7Z"
                      fill="#E9B164"
                    />
                    <path d="M20 32H4V36H20V32Z" fill="#E9B164" />
                    <path d="M56 32H40V36H56V32Z" fill="#E9B164" />
                  </svg>

                  <div style={{ marginLeft: "20px" }}>
                    <h5
                      className="card-category"
                      style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                    >
                      Discount %
                    </h5>
                    <CardTitle tag="h3">
                      {salesData?.totalDiscount
                        ? Number(salesData?.totalDiscount?.toFixed(1))
                        : 0}
                      %
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart">
                <CardHeader style={{ display: "flex", flex: 1 }}>
                  <svg
                    width="60"
                    height="57"
                    viewBox="0 0 60 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0V52.5H18.75V56.25H48.75V52.5H60V0H0ZM45 52.5H22.5V41.25H27.2625C26.625 42.3563 26.25 43.6313 26.25 45C26.25 49.1438 29.6062 52.5 33.75 52.5C37.8937 52.5 41.25 49.1438 41.25 45C41.25 43.6313 40.875 42.3563 40.2375 41.25H45V52.5ZM30 45C30 42.9375 31.6875 41.25 33.75 41.25C35.8125 41.25 37.5 42.9375 37.5 45C37.5 47.0625 35.8125 48.75 33.75 48.75C31.6875 48.75 30 47.0625 30 45ZM56.25 48.75H48.75V41.25H52.5V37.5H15V41.25H18.75V48.75H3.75V3.75H56.25V48.75Z"
                      fill="#B44160"
                    />
                    <path
                      d="M7.5 7.5V33.75H37.5V7.5H7.5ZM33.75 30H11.25V11.25H33.75V30Z"
                      fill="#B44160"
                    />
                    <path d="M52.5 11.25H41.25V15H52.5V11.25Z" fill="#B44160" />
                    <path
                      d="M52.5 18.75H41.25V22.5H52.5V18.75Z"
                      fill="#B44160"
                    />
                    <path d="M52.5 26.25H41.25V30H52.5V26.25Z" fill="#B44160" />
                  </svg>

                  <div style={{ marginLeft: "20px" }}>
                    <h5
                      className="card-category"
                      style={{
                        color: color === "darkBlue" ? "#fff" : "#000",
                        fontWeight: 600,
                      }}
                    >
                      Profit
                    </h5>
                    <CardTitle tag="h3">
                      $
                      {salesData?.totalProfit
                        ? Number(salesData?.totalProfit?.toFixed(1))
                        : 0}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="6" md="6">
              <Card className="card-tasks">
                <CardHeader>
                  <h6
                    className="title d-inline"
                    style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                  >
                    Sales by City
                  </h6>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width">
                    <LineChart color={color} options={salesDataByCity} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="6">
              <Card className="card-tasks">
                <CardHeader>
                  <h6
                    className="title d-inline"
                    style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                  >
                    Sales by Products
                  </h6>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width">
                    <Table className="tablesorter">
                      <thead className="text-primary">
                        <tr>
                          <th>Product Name</th>
                          <th>Sales in $</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesDataByProduct?.length ? (
                          salesDataByProduct?.map((val, i) => {
                            return (
                              <tr key={i}>
                                <td
                                  style={{ background: "#d6eff3" }}
                                  width={"500px"}
                                >
                                  {val?.product}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ background: "#8bd0e0" }}
                                >
                                  ${val.sales}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              style={{ background: "#d6eff3" }}
                              width={"500px"}
                            >
                              Dakota Rice
                            </td>
                            <td
                              className="text-center"
                              style={{ background: "#8bd0e0" }}
                            >
                              $36,738
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4" md="4">
              <Card className="card-tasks">
                <CardHeader>
                  <h6
                    className="title d-inline"
                    style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                  >
                    Sales By Category
                  </h6>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width">
                    <ChartComponent
                      data={
                        salesDataByCategory?.length
                          ? salesDataByCategory
                          : [
                              { value: 1048, name: "Furniture" },
                              { value: 735, name: "Office Supplies" },
                              { value: 580, name: "Technology" },
                            ]
                      }
                      color={color}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4" md="4">
              <Card className="card-tasks">
                <CardHeader>
                  <h6
                    className="title d-inline"
                    style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                  >
                    Sales By Sub Category
                  </h6>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width">
                    <Table className="tablesorter">
                      <thead className="text-primary">
                        <tr>
                          <th>Product Name</th>
                          <th>Sales in $</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesDataBySubCategory?.length ? (
                          salesDataBySubCategory?.map((val, i) => {
                            return (
                              <tr key={i}> 
                                <td
                                  style={{ background: "#d6eff3" }}
                                  width={"300px"}
                                >
                                  {val?.subCategory}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ background: "#8bd0e0" }}
                                >
                                  $ {val.sales}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              style={{ background: "#d6eff3" }}
                              width={"500px"}
                            >
                              Dakota Rice
                            </td>
                            <td
                              className="text-center"
                              style={{ background: "#8bd0e0" }}
                            >
                              $36,738
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4" md="4">
              <Card className="card-tasks">
                <CardHeader>
                  <h6
                    className="title d-inline"
                    style={{ color: color === "darkBlue" ? "#fff" : "#000" }}
                  >
                    Sales By Segment
                  </h6>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width">
                    <ChartComponent
                      data={
                        salesDataBySegment?.length
                          ? salesDataBySegment
                          : [
                              { value: 1048, name: "Furniture" },
                              { value: 735, name: "Office Supplies" },
                              { value: 580, name: "Technology" },
                            ]
                      }
                      color={color}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Dashboard;
