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
        "Badge": [Function],
        "Button": [Function],
        "Calendar": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Carousel": [Function],
        "Cell": [Function],
        "Checkbox": [Function],
        "Collapse": [Function],
        "ConfigProvider": [Function],
        "ConfigReceiver": [Function],
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
        "Input": [Function],
        "Keyboard": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "KeyboardPicker": [Function],
        "Loading": [Function],
        "LocaleProvider": Object {
          "$$typeof": Symbol(react.forward_ref),
          "render": [Function],
        },
        "Marquee": [Function],
        "Mask": [Function],
        "Message": [Function],
        "Modal": [Function],
        "NavBar": [Function],
        "NoticeBar": [Function],
        "Panel": [Function],
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
        "Radio": [Function],
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
        "Stepper": [Function],
        "SwipeAction": [Function],
        "Switch": [Function],
        "TabBar": [Function],
        "Tabs": [Function],
        "Toast": [Function],
        "Tooltip": [Function],
        "Trigger": [Function],
        "Wheel": [Function],
      }
    `);
  });
});
