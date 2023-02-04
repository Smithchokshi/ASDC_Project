import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { FooterMain } from './footer_style';
import { globalVariables } from '../../../Globals';

const { API_URL } = globalVariables;
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  getContactDeatails = () => {};

  render() {
    return (
      <FooterMain className="common-padding footer-section full-width">
        <div className="wrapper">
          <div className="full-width footer-box-main footer-top">
            <div className="footer-box footer-box-1 footer-logo">
              <img src="https://quiverx-images.s3.amazonaws.com/images/top-logo-new.svg" />
            </div>

            <div className="footer-box footer-box-2">
              <ul>
                <li className="title">
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Our Team</a>
                </li>
                <li>
                  <a href="#">How it Works</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="footer-box footer-box-3">
              <ul>
                <li className="title">
                  <a href="#">Investors</a>
                </li>
                <li>
                  <a href="#">Start Investing</a>
                </li>
                <li>
                  <a href="#">Investing 101</a>
                </li>
                <li>
                  <a href="#">Investor FAQ</a>
                </li>
                <li>
                  <a href="#">Earn 10% Bonus</a>
                </li>
              </ul>
            </div>
            <div className="footer-box footer-box-2">
              <ul>
                <li className="title">
                  <a href="#">Legal/Contact</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Disclaimer</a>
                </li>
                <li>
                  <a href="#">Annual Reports</a>
                </li>
              </ul>
            </div>

            <div className="footer-box footer-box-4">
              <ul>
                <li className="no-hover">
                  1330 Cooks Mine Road <div className="full-width">Twin Lakes, Mexico - 86515</div>
                </li>
                <li>
                  <a href="tel:+451-841-1241">+451-841-1241</a>
                </li>
                <li>
                  <a href="mailto:info@quiverx.io">info@quiverx.io</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom full-width ">
          <div className="wrapper flex-center">
            <div className="copyrights">
              Copyright © {new Date().getFullYear()} QuiverX.io<span> | </span>
              All Rights Reserved
            </div>
            <div>
              <a href="#">Privacy Policy</a> <span>| </span>
              <a href="#">Terms & Conditions</a>
            </div>
            <div className="footer-social">
              <a href="https://twitter.com/QuiverX5" target="_blank" rel="noreferrer">
                <img
                  src="https://quiverx-images.s3.amazonaws.com/images/footer-social-1.svg"
                  alt="logo"
                />
              </a>
              <a
                href="https://t.me/joinchat/SJfRpBxjLExVcFYGwfMZSw"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://quiverx-images.s3.amazonaws.com/images/footer-social-2.svg"
                  alt="logo"
                />
              </a>
              <a href="#" target="_blank">
                <img src="https://quiverx-images.s3.amazonaws.com/images/social.svg" alt="logo" />
              </a>
              <a href="https://medium.com/@QuiverX" target="_blank" rel="noreferrer">
                <img
                  src="https://quiverx-images.s3.amazonaws.com/images/footer-social-4.svg"
                  alt="logo"
                />
              </a>
              <a href="https://github.com/QuiverX" target="_blank" rel="noreferrer">
                <img
                  src="https://quiverx-images.s3.amazonaws.com/images/footer-social-5.svg"
                  alt="logo"
                />
              </a>
            </div>
            {/* {contactDetails[0] && (
                <div className="footer-social">
                  <a href={contactDetails[4].value} target="_blank">
                    <img
                      src={`${process.env.REACT_APP_S3URL}/images/footer-social-1.svg`}
                      alt="logo"
                    ></img>
                  </a>
                  <a href={contactDetails[3].value} target="_blank">
                    <img
                      src={`${process.env.REACT_APP_S3URL}/images/footer-social-2.svg`}
                      alt="logo"
                    ></img>
                  </a>
                  <a href="#" target="_blank">
                    <img src="https://quiverx-images.s3.amazonaws.com/images/social.svg" alt="logo" />
                  </a>
                  <a href={contactDetails[2].value} target="_blank">
                    <img
                      src={`${process.env.REACT_APP_S3URL}/images/footer-social-4.svg`}
                      alt="logo"
                    ></img>
                  </a>
                  <a href={contactDetails[1].value} target="_blank">
                    <img
                      src={`${process.env.REACT_APP_S3URL}/images/footer-social-5.svg`}
                      alt="logo"
                    ></img>
                  </a>
                </div>
              )} */}
          </div>
        </div>
      </FooterMain>
    );
  }
}
