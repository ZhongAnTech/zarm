import { css } from '@emotion/react';
import * as React from 'react';

export interface Author {
  avatar: string;
  href: string;
  type: 'design' | 'develop';
  name: string;
}

export interface Article {
  title: string;
  href: string;
  date: string;
  type: 'design' | 'develop';
  author: Author['name'];
}

export interface Recommendation {
  title?: string;
  img?: string;
  href?: string;
  popularize?: boolean;
  description?: string;
}

type SourceType = 'zhihu' | 'yuque';
export interface Extra {
  title: string;
  description: string;
  date: string;
  img: string;
  source: SourceType;
  href: string;
}

export interface Icon {
  name: string;
  href: string;
}

export type Articles = {
  cn: Article[];
  en: Article[];
};

export type Authors = Author[];

export type Recommendations = {
  cn: Recommendation[];
  en: Recommendation[];
};

export type Extras = {
  cn: Extra[];
  en: Extra[];
};

export type Icons = Icon[];

export type SiteData = {
  articles: Articles;
  authors: Authors;
  recommendations: Recommendations;
  extras: Extras;
  icons: Icons;
};

export function preLoad(list: string[]) {
  if (typeof window !== 'undefined') {
    // 图处预加载；
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);
    list.forEach((src) => {
      const img = new Image();
      img.src = src;
      div.appendChild(img);
    });
  }
}

export function useSiteData(): [Partial<SiteData>, boolean] {
  const [data, setData] = React.useState<Partial<SiteData>>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   if (Object.keys(data ?? {}).length === 0 && typeof fetch !== 'undefined') {
  //     setLoading(true);
  //     fetch(`https://render.alipay.com/p/h5data/antd4-config_website-h5data.json`)
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setData(result);
  //         setLoading(false);
  //       });
  //   }
  // }, []);

  return [data, loading];
}

export const useCarouselStyle = () => ({
  carousel: css`
    .slick-dots.slick-dots-bottom {
      bottom: -22px;
      li {
        width: 6px;
        height: 6px;
        background: #e1eeff;
        border-radius: 50%;
        button {
          height: 6px;
          background: #e1eeff;
          border-radius: 50%;
        }
        &.slick-active {
          background: #4b9cff;
          button {
            background: #4b9cff;
          }
        }
      }
    }
  `,
});
