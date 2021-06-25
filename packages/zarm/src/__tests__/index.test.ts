import * as zarm from '..';

describe('index', () => {
  it('should re-export each react component', () => {
    expect(zarm).toMatchInlineSnapshot(`
      Object {
        "ActionSheet": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "ActivityIndicator": [Function],
        "Affix": [Function],
        "BackToTop": [Function],
        "Badge": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "prefixCls": "za-badge",
            "shape": "dot",
            "theme": "danger",
          },
          "render": [Function],
        },
        "Button": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Calendar": [Function],
        "Carousel": [Function],
        "Cell": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "disabled": false,
            "hasArrow": false,
            "prefixCls": "za-cell",
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
              "prefixCls": "za-checkbox-group",
              "shape": "radius",
              "size": "xs",
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "disabled": false,
            "indeterminate": false,
            "prefixCls": "za-checkbox",
            "shape": "radius",
          },
          "render": [Function],
        },
        "Collapse": [Function],
        "ConfigProvider": [Function],
        "ConfigReceiver": [Function],
        "CustomInput": Object {
          "$$typeof": Symbol(react.forward_ref),
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
          "render": [Function],
        },
        "Keyboard": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "KeyboardPicker": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Loading": [Function],
        "LocaleProvider": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Marquee": [Function],
        "Mask": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Message": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "closable": false,
            "hasArrow": false,
            "prefixCls": "za-message",
            "theme": "primary",
          },
          "render": [Function],
        },
        "Modal": [Function],
        "NavBar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "prefixCls": "za-nav-bar",
          },
          "render": [Function],
        },
        "NoticeBar": [Function],
        "Panel": Object {
          "$$typeof": Symbol(react.forward_ref),
          "defaultProps": Object {
            "prefixCls": "za-panel",
          },
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
        "Progress": [Function],
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
              "prefixCls": "za-radio-group",
              "shape": "radius",
              "size": "xs",
            },
            "render": [Function],
          },
          "defaultProps": Object {
            "disabled": false,
            "prefixCls": "za-radio",
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
            "prefixCls": "za-stepper",
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
            "prefixCls": "za-switch",
          },
          "render": [Function],
        },
        "TabBar": [Function],
        "Tabs": Object {
          "$$typeof": Symbol(react.forward_ref),
          "Panel": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "render": [Function],
        },
        "Toast": [Function],
        "Tooltip": [Function],
        "Trigger": [Function],
        "Wheel": [Function],
        "useDrag": [Function],
      }
    `);
  });
});
