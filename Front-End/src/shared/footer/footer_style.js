import styled from 'styled-components';
import { fonts, theme, screen } from '../../../constants/constant';

export const FooterMain = styled.div`
  .footer-box-main {
    @media only screen and (min-width: 768px) {
      display: flex;
    }
  }
  &.common-padding {
    padding-bottom: 0;
    padding-top: 60px;
    @media only screen and (max-width: 1500px) {
      padding-top: 45px;
      @media only screen and (max-width: 993px) {
        padding-top: 40px;
        @media only screen and (max-width: 767px) {
          padding-top: 15px;
        }
      }
    }
  }
  background: #1b1b1b;
  float: left;
  width: 100%;
  background-size: cover !important;
  background-position: top center !important;
  background-repeat: no-repeat !important;
  text-align: center;
  color: #fff;
  font-size: ${fonts.font_16};
  @media only screen and (max-width: ${screen.xl}) {
    font-size: ${fonts.font_15};
  }
  @media only screen and (max-width: ${screen.md}) {
    font-size: ${fonts.font_15};
  }
  h2 {
    color: #fff;
    font-size: ${fonts.font_36};
    @media only screen and (max-width: ${screen.xxl}) {
      font-size: ${fonts.font_34};
      padding-bottom: 20px;
      @media only screen and (max-width: ${screen.lg}) {
        font-size: ${fonts.font_32};
        @media only screen and (max-width: ${screen.lg}) {
          line-height: normal;
          font-size: ${fonts.font_26};
          @media only screen and (max-width: ${screen.xs}) {
            font-size: ${fonts.font_24};
          }
        }
      }
    }
  }
  .footer-box {
    text-align: left;
    &.footer-box-1 {
      float: left;
      width: 32%;
      @media only screen and (max-width: 993px) {
        img {
          max-width: 130px;
        }
        width: 22%;
      }
    }
    &.footer-box-2 {
      float: left;
      width: 17%;
      @media only screen and (max-width: 993px) {
        position: relative;
        left: 15px;
      }
    }
    &.footer-box-3 {
      float: left;
      width: 16%;
    }
    &.footer-box-4 {
      float: left;
      width: 20%;
      @media only screen and (max-width: 993px) {
        width: 23%;
        position: relative;
        left: 20px;
      }
    }
    li {
      &.title {
        pointer-events: none;
        font-family: 'GraphikSemibold';
      }
      position: relative;
      float: left;
      width: 100%;
      -webkit-transition: all 0.4s ease;
      -moz-transition: all 0.4s ease;
      -ms-transition: all 0.4s ease;
      -o-transition: all 0.4s ease;
      transition: all 0.4s ease;
      margin-bottom: 7px;
      @media only screen and (max-width: 993px) {
        margin-bottom: 5px;
        @media only screen and (max-width: 800px) {
          font-size: 14px;
        }
      }
      a {
        color: #fff;
      }
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        font-family: 'fontAwesome';
        content: '\f0da';
        color: #fff;
        opacity: 0;
        -webkit-transition: all 0.4s ease;
        -moz-transition: all 0.4s ease;
        -ms-transition: all 0.4s ease;
        -o-transition: all 0.4s ease;
        transition: all 0.4s ease;
      }
      &:hover {
        padding-left: 12px;
        &:after {
          opacity: 1;
        }
      }
      &.no-hover {
        padding-left: 0px;
        &:after {
          opacity: 0;
        }
      }
    }
    @media only screen and (max-width: 767px) {
      width: 100% !important;
      margin-top: 5px;
      left: 0 !important;
      &.footer-box-1 {
        margin: 0 0 30px 0;
      }
    }
  }

  .footer-bottom {
    font-size: 14px;
    margin-top: 15px;
    .wrapper {
      border-top: 1px solid #d8d8d8;
      padding-top: 20px;
      padding-bottom: 20px;
      font-size: 15px;
      @media only screen and (max-width: 800px) {
        font-size: 14px;
      }
      @media only screen and (min-width: 993px) {
        display: flex;
        justify-content: space-between;

        > div.copyrights {
          width: 44%;
        }
      }
      > div {
        @media only screen and (min-width: 994px) {
          width: 33.3%;
        }

        &:last-child {
          text-align: right;
        }
        &:nth-child(2) {
          text-align: center;
        }
        // width: 33.3%;
        float: left;
        text-align: left;
        > span {
          margin: 0 10px;
          @media only screen and (max-width: 993px) {
            margin: 0 3px;
          }
        }
        @media only screen and (max-width: 993px) {
          margin: 4px 0;
          text-align: center;
        }
      }
      @media only screen and (max-width: 993px) {
        flex-direction: column;
      }
    }
    a {
      color: #fff;
    }
    .footer-social {
      a {
        margin-left: 12px;
        position: relative;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
        &:hover {
          -moz-transform: translateY(-3px);
          -webkit-transform: translateY(-3px);
          -o-transform: translateY(-3px);
          -ms-transform: translateY(-3px);
          -webkit-transform: translateY(-3px);
          -ms-transform: translateY(-3px);
          transform: translateY(-3px);
        }
      }
    }
    @media only screen and (max-width: ${screen.md}) {
      @media only screen and (max-width: ${screen.sm}) {
        .flex-center {
          flex-direction: column;
          div {
            margin-bottom: 5px;
          }
        }
      }
    }
    @media only screen and (max-width: 1500px) {
      margin-top: 5px;
    }
  }
`;
