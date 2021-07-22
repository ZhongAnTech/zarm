import * as zarm from '..';

describe('index', () => {
  it('should re-export each react component', () => {
    expect(zarm).toMatchInlineSnapshot(`
      Object {
        "ActionSheet": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "ActivityIndicator": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "loading": true,
            "percent": 20,
            "strokeWidth": 5,
            "type": "circular",
          },
          "render": [Function],
        },
        "Affix": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "offsetTop": 0,
            "scrollContainer": [Window],
          },
          "render": [Function],
        },
        "BackToTop": [Function],
        "Badge": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "shape": "dot",
            "theme": "danger",
          },
          "render": [Function],
        },
        "Button": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "block": false,
            "disabled": false,
            "ghost": false,
            "htmlType": "button",
            "loading": false,
            "shadow": false,
            "shape": "radius",
            "size": "md",
            "theme": "default",
          },
          "render": [Function],
        },
        "Calendar": [Function],
        "Carousel": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "activeIndex": 0,
            "animationDuration": 500,
            "autoPlay": false,
            "autoPlayIntervalTime": 3000,
            "direction": "left",
            "height": 160,
            "loop": false,
            "moveDistanceRatio": 0.5,
            "moveTimeSpan": 300,
            "showPagination": true,
            "swipeable": true,
          },
          "render": [Function],
        },
        "Cell": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "disabled": false,
            "hasArrow": false,
          },
          "render": [Function],
        },
        "Checkbox": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Group": Object {
            "$$typeof": Symbol(react.forward_ref),
            "defaultProps": Object {
              "block": false,
              "compact": false,
              "disabled": false,
              "ghost": false,
              "shape": "radius",
              "size": "xs",
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "disabled": false,
            "indeterminate": false,
            "shape": "radius",
          },
          "render": [Function],
        },
        "Collapse": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Item": Object {
            "$$typeof": Symbol(react.forward_ref),
            "defaultProps": Object {
              "animated": false,
              "disabled": false,
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "animated": false,
            "multiple": false,
          },
          "render": [Function],
        },
        "ConfigProvider": [Function],
        "CustomInput": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "autoFocus": false,
            "clearable": true,
            "readOnly": false,
            "type": "number",
          },
          "render": [Function],
        },
        "DatePicker": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "DatePickerView": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "DateSelect": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Drag": [Function],
        "FilePicker": [Function],
        "Icon": [Function],
        "ImagePreview": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Input": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "autoFocus": false,
            "autoHeight": false,
            "clearable": true,
            "disabled": false,
            "readOnly": false,
            "showLength": false,
            "type": "text",
          },
          "render": [Function],
        },
        "Keyboard": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "type": "number",
          },
          "render": [Function],
        },
        "KeyboardPicker": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "destroy": true,
            "type": "number",
            "visible": false,
          },
          "render": [Function],
        },
        "Loading": [Function],
        "Marquee": [Function],
        "Mask": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "type": "normal",
            "visible": false,
          },
          "render": [Function],
        },
        "Message": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "closable": false,
            "hasArrow": false,
            "theme": "primary",
          },
          "render": [Function],
        },
        "Modal": [Function],
        "NConfigProvider": [Function],
        "NavBar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {},
          "render": [Function],
        },
        "NoticeBar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "closable": false,
            "delay": 2000,
            "hasArrow": false,
            "icon": <ForwardRef(SvgVolume) />,
            "speed": 50,
            "theme": "warning",
          },
          "render": [Function],
        },
        "Panel": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {},
          "render": [Function],
        },
        "Picker": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "PickerView": [Function],
        "Popper": [Function],
        "Popup": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Progress": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "percent": 0,
            "shape": "line",
            "size": "md",
            "strokeShape": "round",
            "text": [Function],
            "theme": "primary",
          },
          "render": [Function],
        },
        "Pull": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Radio": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Group": Object {
            "$$typeof": Symbol(react.forward_ref),
            "defaultProps": Object {
              "block": false,
              "compact": false,
              "disabled": false,
              "ghost": false,
              "shape": "radius",
              "size": "xs",
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "disabled": false,
            "shape": "radius",
          },
          "render": [Function],
        },
        "Scroller": [Function],
        "SearchBar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Select": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Slider": [Function],
        "StackPicker": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Stepper": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "disableInput": false,
            "disabled": false,
            "shape": "radius",
            "step": 1,
            "type": "number",
          },
          "render": [Function],
        },
        "SwipeAction": [Function],
        "Switch": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "disabled": false,
          },
          "render": [Function],
        },
        "TabBar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Item": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "defaultProps": Object {
            "visible": true,
          },
          "render": [Function],
        },
        "Tabs": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Panel": Object {
            "$$typeof": Symbol(react.forward_ref),
            "defaultProps": Object {},
            "render": [Function],
          },
          "defaultProps": Object {
            "direction": "horizontal",
            "disabled": false,
            "scrollable": false,
            "swipeable": false,
          },
          "render": [Function],
        },
        "Toast": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "mask": false,
            "stayTime": 3000,
            "visible": false,
          },
          "render": [Function],
          "useToast": [Function],
        },
        "Tooltip": [Function],
        "Trigger": [Function],
        "Wheel": [Function],
        "useDrag": [Function],
        "useLongPress": [Function],
        "useOrientation": [Function],
        "useSafeLayoutEffect": [Function],
      }
    `);
  });
});
