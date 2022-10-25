import * as zarm from '..';

describe('index', () => {
  it('should re-export each react component', () => {
    expect(zarm).toMatchInlineSnapshot(`
      Object {
        "ActionSheet": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "actions": Array [],
            "destroy": true,
            "safeIphoneX": false,
            "spacing": false,
            "visible": false,
          },
          "render": [Function],
          "show": [Function],
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
        "BackTop": [Function],
        "Badge": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "shape": "dot",
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
        "Calendar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "dateRender": [Function],
            "direction": "vertical",
            "disabledDate": [Function],
            "header": false,
            "mode": "single",
          },
          "render": [Function],
        },
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
        "Checkbox": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Group": Object {
            "$$typeof": Symbol(react.forward_ref),
            "defaultProps": Object {
              "block": false,
              "buttonCompact": false,
              "buttonGhost": false,
              "buttonShape": "radius",
              "buttonSize": "xs",
              "disabled": false,
              "listMarkerAlign": "before",
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "disabled": false,
            "indeterminate": false,
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
            "clearable": false,
            "disabled": false,
            "readOnly": false,
            "type": "number",
          },
          "render": [Function],
        },
        "DatePicker": [Function],
        "DatePickerView": [Function],
        "DateSelect": [Function],
        "FilePicker": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "disabled": false,
            "multiple": false,
            "onBeforeSelect": [Function],
          },
          "render": [Function],
        },
        "Grid": [Function],
        "Icon": Object {
          "$$typeof": Symbol(react.forward_ref),
          "createFromIconfont": [Function],
          "defaultProps": Object {
            "viewBox": "0 0 1000 1000",
          },
          "render": [Function],
        },
        "Image": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "fallback": false,
            "fit": "fill",
            "lazy": false,
            "placeholder": false,
            "preview": false,
            "shape": "rect",
          },
          "render": [Function],
        },
        "ImagePreview": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "activeIndex": 0,
            "maxScale": 3,
            "minScale": 1,
            "showPagination": true,
            "visible": false,
          },
          "render": [Function],
          "show": [Function],
        },
        "Input": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "autoFocus": false,
            "autoHeight": false,
            "clearable": false,
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
        "List": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Item": Object {
            "$$typeof": Symbol(react.forward_ref),
            "defaultProps": Object {
              "hasArrow": true,
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "bordered": true,
          },
          "render": [Function],
        },
        "Loading": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "mask": true,
          },
          "render": [Function],
          "useLoading": [Function],
        },
        "Marquee": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "delay": 0,
            "direction": "left",
            "speed": 30,
          },
          "render": [Function],
        },
        "Mask": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "color": "black",
            "opacity": "normal",
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
        "Modal": Object {
          "$$typeof": Symbol(react.forward_ref),
          "alert": [Function],
          "confirm": [Function],
          "defaultProps": Object {
            "actions": Array [],
            "animationType": "fade",
            "closable": false,
            "destroy": true,
            "mask": true,
            "maskClosable": false,
            "shape": "radius",
            "visible": false,
            "width": "70%",
          },
          "render": [Function],
        },
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
          "defaultProps": Object {
            "spacing": false,
          },
          "render": [Function],
        },
        "Picker": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "cols": Infinity,
            "dataSource": Array [],
            "destroy": false,
            "maskClosable": true,
          },
          "render": [Function],
        },
        "PickerView": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "cols": Infinity,
            "dataSource": Array [],
            "defaultValue": Array [],
            "disabled": false,
          },
          "render": [Function],
        },
        "PinchZoom": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "maxScale": 3,
            "minScale": 1,
          },
          "render": [Function],
        },
        "Popper": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "animationType": "zoom-fade",
            "arrowPointAtCenter": false,
            "destroy": false,
            "direction": "top",
            "hasArrow": false,
            "mouseEnterDelay": 150,
            "mouseLeaveDelay": 100,
            "onVisibleChange": [Function],
            "trigger": "hover",
            "visible": false,
          },
          "render": [Function],
        },
        "Popup": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "destroy": true,
            "direction": "bottom",
            "lockScroll": true,
            "mask": true,
            "visible": false,
          },
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
          "defaultProps": Object {
            "animationDuration": 400,
            "load": Object {
              "distance": 0,
              "state": 0,
            },
            "refresh": Object {
              "distance": 30,
              "startDistance": 30,
              "state": 0,
            },
            "stayTime": 1000,
          },
          "render": [Function],
        },
        "Radio": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Group": Object {
            "$$typeof": Symbol(react.forward_ref),
            "defaultProps": Object {
              "block": false,
              "buttonCompact": false,
              "buttonGhost": false,
              "buttonShape": "radius",
              "buttonSize": "xs",
              "disabled": false,
              "listMarkerAlign": "before",
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "disabled": false,
          },
          "render": [Function],
        },
        "Rate": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "allowClear": false,
            "allowHalf": false,
            "character": <ForwardRef(SvgStarFill) />,
            "count": 5,
            "defaultValue": 0,
          },
          "render": [Function],
        },
        "Scroller": [Function],
        "SearchBar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "clearable": true,
            "disabled": false,
            "shape": "radius",
            "showCancel": false,
          },
          "render": [Function],
        },
        "Select": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "cols": Infinity,
            "dataSource": Array [],
            "displayRender": [Function],
            "maskClosable": true,
            "onClick": [Function],
          },
          "render": [Function],
        },
        "Skeleton": [Function],
        "Slider": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "disabled": false,
            "marks": Object {},
            "max": 100,
            "min": 0,
            "showMark": false,
            "step": 1,
            "vertical": false,
          },
          "render": [Function],
        },
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
        "SwipeAction": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "animationDuration": 300,
            "autoClose": true,
            "disabled": false,
            "leftActions": Array [],
            "moveDistanceRatio": 0.5,
            "moveTimeSpan": 300,
            "offset": 10,
            "rightActions": Array [],
          },
          "render": [Function],
        },
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
        "Tooltip": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "direction": "top",
            "hasArrow": true,
            "onVisibleChange": [Function],
          },
          "render": [Function],
        },
        "Trigger": [Function],
        "WaterMark": [Function],
        "Wheel": [Function],
        "useClickAway": [Function],
        "useDrag": [Function],
        "useInViewport": [Function],
        "useLongPress": [Function],
        "useOrientation": [Function],
        "useScroll": [Function],
      }
    `);
  });
});
