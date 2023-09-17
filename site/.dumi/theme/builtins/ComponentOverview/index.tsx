import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Affix, Card, Col, Divider, Input, Row, Space, Tag, Typography } from 'antd';
import { Link, useIntl, useLocation, useSidebarData } from 'dumi';
import type { CSSProperties } from 'react';
import React, { memo, useContext, useMemo, useRef, useState } from 'react';
import { useSiteToken } from '../../../hooks';
import { SiteContext } from '../../slots/SiteContext';
import type { Component } from './types';

const useStyle = () => {
  const { token } = useSiteToken();
  return {
    componentsOverviewGroupTitle: css`
      margin-bottom: 24px !important;
    `,
    componentsOverviewTitle: css`
      overflow: hidden;
      color: ${token.colorTextHeading};
      text-overflow: ellipsis;
    `,
    componentsOverviewImg: css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 152px;
    `,
    componentsOverviewCard: css`
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008;
      }
    `,
    componentsOverviewAffix: css`
      display: flex;
      transition: all 0.3s;
      justify-content: space-between;
    `,
    componentsOverviewSearch: css`
      padding: 0;
      .anticon-search {
        color: ${token.colorTextDisabled};
      }
    `,
    componentsOverviewContent: css`
      &:empty:after {
        display: block;
        padding: 16px 0 40px;
        color: ${token.colorTextDisabled};
        text-align: center;
        border-bottom: 1px solid ${token.colorSplit};
        content: 'Not Found';
      }
    `,
  };
};

const { Title } = Typography;

const Overview: React.FC = () => {
  const style = useStyle();
  const { theme } = useContext(SiteContext);

  const data = useSidebarData();
  const [searchBarAffixed, setSearchBarAffixed] = useState<boolean>(false);

  const { token } = useSiteToken();
  const { borderRadius, colorBgContainer, fontSizeXL } = token;

  const affixedStyle: CSSProperties = {
    boxShadow: 'rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px',
    padding: 8,
    margin: -8,
    borderRadius,
    backgroundColor: colorBgContainer,
  };

  const { search: urlSearch } = useLocation();
  const { locale, formatMessage } = useIntl();

  const [search, setSearch] = useState<string>(() => {
    const params = new URLSearchParams(urlSearch);
    if (params.has('s')) {
      return params.get('s');
    }
    return '';
  });

  const sectionRef = useRef<HTMLElement>(null);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13 && search.trim().length) {
      sectionRef.current?.querySelector<HTMLElement>('.components-overview-card')?.click();
    }
  };

  const groups = useMemo<{ title: string; children: Component[] }[]>(
    () =>
      data
        .filter((item) => item?.title)
        .map<{ title: string; children: Component[] }>((item) => ({
          title: item?.title,
          children: item.children.map((child) => ({
            title: child.frontmatter?.title,
            subtitle: child.frontmatter.subtitle,
            cover: child.frontmatter.cover,
            coverDark: child.frontmatter.coverDark,
            link: child.link,
          })),
        })),
    [data, locale],
  );
  return (
    <section className="markdown" ref={sectionRef}>
      <Divider />
      <Affix offsetTop={24} onChange={setSearchBarAffixed}>
        <div css={style.componentsOverviewAffix} style={searchBarAffixed ? affixedStyle : {}}>
          <Input
            autoFocus
            value={search}
            placeholder={formatMessage({ id: 'app.components.overview.search' })}
            css={style.componentsOverviewSearch}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={onKeyDown}
            bordered={false}
            suffix={<SearchOutlined />}
            style={{ fontSize: searchBarAffixed ? fontSizeXL - 2 : fontSizeXL }}
          />
        </div>
      </Affix>
      <Divider />
      <div css={style.componentsOverviewContent}>
        {groups
          .filter((i) => i?.title)
          .map((group) => {
            const components = group?.children?.filter(
              (component) =>
                !search.trim() ||
                component?.title?.toLowerCase()?.includes(search.trim().toLowerCase()) ||
                (component?.subtitle || '').toLowerCase().includes(search.trim().toLowerCase()),
            );
            return components?.length ? (
              <div key={group?.title}>
                <Title level={2} css={style.componentsOverviewGroupTitle}>
                  <Space align="center">
                    <span style={{ fontSize: 24 }}>{group?.title}</span>
                    <Tag style={{ display: 'block' }}>{components.length}</Tag>
                  </Space>
                </Title>
                <Row gutter={[24, 24]}>
                  {components.map((component) => {
                    /** 是否是外链 */
                    const isExternalLink = component.link.startsWith('http');
                    let url = `${component.link}`;

                    if (!isExternalLink) {
                      url += urlSearch;
                    }

                    /** Link 不能跳转到外链 */
                    const ComponentLink = isExternalLink ? 'a' : Link;

                    return (
                      <Col xs={24} sm={12} lg={8} xl={6} key={component?.title}>
                        <ComponentLink to={url} href={url}>
                          <Card
                            bodyStyle={{
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'bottom right',
                              backgroundImage: `url(${component?.tag || ''})`,
                            }}
                            size="small"
                            css={style.componentsOverviewCard}
                            title={
                              <div css={style.componentsOverviewTitle}>
                                {component?.title} {component.subtitle}
                              </div>
                            }
                          >
                            <div css={style.componentsOverviewImg}>
                              <img
                                src={
                                  theme.includes('dark') && component.coverDark
                                    ? component.coverDark
                                    : component.cover
                                }
                                alt={component?.title}
                              />
                            </div>
                          </Card>
                        </ComponentLink>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ) : null;
          })}
      </div>
    </section>
  );
};

export default memo(Overview);
