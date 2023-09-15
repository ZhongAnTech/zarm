import { useSiteToken } from '.dumi/hooks/useSiteToken';
import { css } from '@emotion/react';
import { Tooltip } from 'antd';
import * as React from 'react';

export interface SwitchBtnProps {
  label1: React.ReactNode;
  label2: React.ReactNode;
  tooltip1?: React.ReactNode;
  tooltip2?: React.ReactNode;
  value: 1 | 2;
  pure?: boolean;
  onClick?: React.MouseEventHandler;
}

const BASE_SIZE = '1.2em';

const useStyle = () => {
  const { token } = useSiteToken();

  const {
    colorText,
    colorBorder,
    colorBgContainer,
    colorBgTextHover,
    borderRadius,
    controlHeight,
    motionDurationMid,
  } = token;

  return {
    btn: css`
      color: ${colorText};
      border-color: ${colorBorder};
      padding: 0 !important;
      width: ${controlHeight}px;
      height: ${controlHeight}px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: ${borderRadius}px;
      transition: all ${motionDurationMid};
      cursor: pointer;
      .btn-inner {
        transition: all ${motionDurationMid};
      }
      &:hover {
        background: ${colorBgTextHover};
      }
      img {
        width: ${BASE_SIZE};
        height: ${BASE_SIZE};
      }
      .anticon {
        font-size: ${BASE_SIZE};
      }
    `,
    innerDiv: css`
      position: relative;
      width: ${BASE_SIZE};
      height: ${BASE_SIZE};
    `,
    labelStyle: css`
      position: absolute;
      font-size: ${BASE_SIZE};
      line-height: 1;
      border: 1px solid ${colorText};
      color: ${colorText};
    `,
    label1Style: css`
      left: -5%;
      top: 0;
      z-index: 1;
      background-color: ${colorText};
      color: ${colorBgContainer};
      transform: scale(0.7);
      transform-origin: 0 0;
    `,
    label2Style: css`
      right: -5%;
      bottom: 0;
      z-index: 0;
      transform: scale(0.5);
      transform-origin: 100% 100%;
    `,
  };
};

export const SwitchBtn: React.FC<SwitchBtnProps> = (props) => {
  const { label1, label2, tooltip1, tooltip2, value, pure, onClick } = props;

  const { btn, innerDiv, labelStyle, label1Style, label2Style } = useStyle();

  const node = (
    <button onClick={onClick} css={btn} key="lang-button">
      <div className="btn-inner">
        {pure && (value === 1 ? label1 : label2)}
        {!pure && (
          <div css={innerDiv}>
            <span css={[labelStyle, value === 1 ? label1Style : label2Style]}>{label1}</span>
            <span css={[labelStyle, value === 1 ? label2Style : label1Style]}>{label2}</span>
          </div>
        )}
      </div>
    </button>
  );

  if (tooltip1 || tooltip2) {
    return <Tooltip title={value === 1 ? tooltip1 : tooltip2}>{node}</Tooltip>;
  }

  return node;
};
