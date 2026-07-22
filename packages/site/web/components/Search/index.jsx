import tokenize from '@/search/tokenize';
import Context from '@/utils/context';
import Events from '@/utils/events';
import classnames from 'classnames';
import React, { useContext, useRef, useState } from 'react';

let searchPromise;

const getSearch = () => {
  if (!searchPromise) {
    searchPromise = Promise.all([import('minisearch'), import('@/search-index.search-index')])
      .then(([miniSearchModule, indexModule]) => {
        const MiniSearch = miniSearchModule.default || miniSearchModule;
        const searchData = indexModule.default || indexModule;
        return MiniSearch.loadJSON(searchData.index, {
          fields: ['title', 'content', 'keywords'],
          idField: 'id',
          storeFields: ['title', 'summary', 'type', 'version', 'url'],
          tokenize,
        });
      })
      .catch((error) => {
        searchPromise = null;
        throw error;
      });
  }
  return searchPromise;
};

const Search = ({ placeholder }) => {
  const { locale } = useContext(Context);
  const rootRef = useRef();
  const inputRef = useRef();
  const requestRef = useRef(0);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const messages =
    locale === 'enUS'
      ? {
          failed: 'Search index failed to load',
          loading: 'Loading search index…',
          noResults: 'No results found',
        }
      : { failed: '搜索索引加载失败', loading: '正在加载搜索索引…', noResults: '未找到相关内容' };

  React.useEffect(() => {
    const handleShortcut = (event) => {
      if (event.key.toLowerCase() === 's' && event.target === document.body) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    const handleOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    Events.on(document, 'keyup', handleShortcut);
    Events.on(document, 'mousedown', handleOutsideClick);
    return () => {
      Events.off(document, 'keyup', handleShortcut);
      Events.off(document, 'mousedown', handleOutsideClick);
    };
  }, []);

  React.useEffect(() => {
    const normalizedQuery = query.trim();
    const request = requestRef.current + 1;
    requestRef.current = request;

    if (!normalizedQuery) {
      setResults([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setFailed(false);
    getSearch()
      .then((search) => {
        if (requestRef.current !== request) return;
        const nextResults = search
          .search(normalizedQuery, {
            boost: { title: 4, keywords: 3, content: 1 },
            fuzzy: normalizedQuery.length > 3 ? 0.2 : false,
            prefix: true,
          })
          .slice(0, 8);
        setResults(nextResults);
        setActiveIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        if (requestRef.current !== request) return;
        // Keep the input usable if a cached search chunk fails to load after a deployment.
        console.error('Failed to load the documentation search index.', error);
        setResults([]);
        setFailed(true);
        setLoading(false);
      });

    return undefined;
  }, [query]);

  const visible = open && query.trim();

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      window.location.href = results[activeIndex].url;
      setOpen(false);
    }
  };

  return (
    <div className="search__control" ref={rootRef}>
      <input
        aria-activedescendant={results.length ? `site-search-result-${activeIndex}` : undefined}
        aria-autocomplete="list"
        aria-controls="site-search-results"
        aria-expanded={Boolean(visible)}
        aria-label={placeholder}
        className="search__input"
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          getSearch();
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={inputRef}
        role="combobox"
        value={query}
      />
      {visible && (
        <div className="search__dropdown" id="site-search-results" role="listbox">
          {loading && <div className="search__status">{messages.loading}</div>}
          {!loading && failed && <div className="search__status">{messages.failed}</div>}
          {!loading && !failed && !results.length && (
            <div className="search__status">{messages.noResults}</div>
          )}
          {!loading &&
            results.map((result, index) => (
              <a
                aria-selected={activeIndex === index}
                className={classnames('search__result', { 'is-active': activeIndex === index })}
                href={result.url}
                id={`site-search-result-${index}`}
                key={result.id}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
              >
                <div className="search__result-header">
                  <span>{result.title}</span>
                  <span className="search__version">{result.version}</span>
                </div>
                {result.summary && <div className="search__summary">{result.summary}</div>}
              </a>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
