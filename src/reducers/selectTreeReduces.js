export const selectState = {
  checked: "checked",
  intederminate: "intederminate",
  unChecked: "unChecked",
};

const selectTreeReducer = (selectTree, action) => {
  const totalOrdersPrevSelected = () => {
    let total = 0;
    selectTree.categories.forEach((category) =>
      category.orderItems.forEach((item) => {
        if (item.selected === selectState.checked) {
          total++;
        }
      })
    );
    return total;
  };

  const totalOrdersInCategoryPrevSelected = (id) => {
    let total = 0;
    selectTree.categories
      .find((category) => category.id === id)
      ?.orderItems?.forEach((item) => {
        if (item.selected === selectState.checked) {
          total++;
        }
      });
    return total;
  };

  switch (action.type) {
    case "TOP_LEVEL_SELECT":
      if (
        selectTree.selectAll === selectState.unChecked ||
        selectTree.selectAll === selectState.intederminate
      ) {
        return {
          ...selectTree,
          selectAll: selectState.checked,
          categories: selectTree.categories.map((row) => {
            return {
              ...row,
              selectAllOrders: selectState.checked,
              orderItems: row.orderItems.map((order) => {
                return { ...order, selected: selectState.checked };
              }),
            };
          }),
        };
      } else {
        return {
          ...selectTree,
          selectAll: selectState.unChecked,
          categories: selectTree.categories.map((row) => {
            return {
              ...row,
              selectAllOrders: selectState.unChecked,
              orderItems: row.orderItems.map((order) => {
                return { ...order, selected: selectState.unChecked };
              }),
            };
          }),
        };
      }

    case "CATEGORY_LEVEL_SELECT":
      const prevCategoryState = selectTree.categories.find(
        (category) => category.id === action.id
      );
      const prevSelectState = prevCategoryState?.selectAllOrders;
      const prevTotal = totalOrdersPrevSelected();

      const selectAllNextState = (() => {
        if (prevSelectState === selectState.checked) {
          if (
            prevTotal -
              [...prevCategoryState.orderItems].filter(
                (category) => category.id !== action.id
              )?.length ===
            0
          ) {
            return selectState.unChecked;
          } else {
            return selectState.intederminate;
          }
        } else {
          if (
            prevTotal +
              [...prevCategoryState.orderItems].filter(
                (category) => category.id !== action.id
              )?.length ===
            selectTree.totalOrders
          ) {
            return selectState.checked;
          } else {
            return selectState.intederminate;
          }
        }
      })();

      if (
        prevSelectState === selectState.unChecked ||
        prevSelectState === selectState.intederminate
      ) {
        return {
          ...selectTree,
          selectAll: selectAllNextState,
          categories: selectTree.categories.map((category) => {
            if (category.id === action.id) {
              return {
                ...category,
                selectAllOrders: selectState.checked,
                orderItems: category.orderItems.map((order) => {
                  return {
                    ...order,
                    selected: selectState.checked,
                  };
                }),
              };
            } else {
              return {
                ...category,
                orderItems: category.orderItems.map((order) => {
                  return { ...order };
                }),
              };
            }
          }),
        };
      } else {
        return {
          ...selectTree,
          selectAll: selectAllNextState,
          categories: selectTree.categories.map((category) => {
            if (category.id === action.id) {
              return {
                ...category,
                selectAllOrders: selectState.unChecked,
                orderItems: category.orderItems.map((order) => {
                  return {
                    ...order,
                    selected: selectState.unChecked,
                  };
                }),
              };
            } else {
              return {
                ...category,
                orderItems: category.orderItems.map((order) => {
                  return { ...order };
                }),
              };
            }
          }),
        };
      }

    case "BOTTOM_LEVEL_SELECT":
      let prevOderSelected = {};
      selectTree.categories.forEach((category) => {
        const found = category.orderItems.find(
          (order) => order.orderId == action.id
        );
        if (found) {
          prevOderSelected = { ...found };
        }
      });

      let parentCategory = {};
      selectTree.categories.forEach((category) => {
        category.orderItems.forEach((order) => {
          if (order.orderId === action.id) {
            parentCategory = category;
          }
        });
      });
      const prevTotalSelected = totalOrdersPrevSelected();
      const totalElements = selectTree.totalOrders;
      const prevTotalInCategorySelect = totalOrdersInCategoryPrevSelected(
        parentCategory.id
      );
      const totalElementsInCategory = parentCategory?.orderItems?.length;

      const parentNextState = (() => {
        if (prevOderSelected.selected == selectState.checked) {
          if (prevTotalInCategorySelect - 1 > 0) {
            return selectState.intederminate;
          } else {
            return selectState.unChecked;
          }
        } else {
          if (prevTotalInCategorySelect + 1 == totalElementsInCategory) {
            return selectState.checked;
          } else {
            return selectState.intederminate;
          }
        }
      })();

      const totalSelectNextState = (() => {
        if (prevOderSelected.selected == selectState.checked) {
          if (prevTotalSelected - 1 > 0) {
            return selectState.intederminate;
          } else {
            return selectState.unChecked;
          }
        } else {
          if (prevTotalSelected + 1 == totalElements) {
            return selectState.checked;
          } else {
            return selectState.intederminate;
          }
        }
      })();

      //checking the box
      if (prevOderSelected.selected === selectState.unChecked) {
        return {
          ...selectTree,
          selectAll: totalSelectNextState,
          categories: selectTree.categories.map((category) => {
            if (category.id === parentCategory.id) {
              return {
                ...category,
                selectAllOrders: parentNextState,
                orderItems: category.orderItems.map((order) => {
                  if (order.orderId === action.id) {
                    return {
                      ...order,
                      selected: selectState.checked,
                    };
                  } else {
                    return {
                      ...order,
                    };
                  }
                }),
              };
            } else {
              return {
                ...category,
                orderItems: category.orderItems.map((order) => {
                  if (order.orderId === action.id) {
                    return {
                      ...order,
                      selected: selectState.checked,
                    };
                  } else {
                    return {
                      ...order,
                    };
                  }
                }),
              };
            }
          }),
        };
      }

      //unchecking the box
      else {
        return {
          ...selectTree,
          selectAll: totalSelectNextState,
          categories: selectTree.categories.map((category) => {
            if (category.id === parentCategory.id) {
              return {
                ...category,
                selectAllOrders: parentNextState,
                orderItems: category.orderItems.map((order) => {
                  if (order.orderId === action.id) {
                    return {
                      ...order,
                      selected: selectState.unChecked,
                    };
                  } else {
                    return {
                      ...order,
                    };
                  }
                }),
              };
            } else {
              return {
                ...category,
                orderItems: category.orderItems.map((order) => {
                  if (order.orderId === action.id) {
                    return {
                      ...order,
                      selected: selectState.unChecked,
                    };
                  } else {
                    return {
                      ...order,
                    };
                  }
                }),
              };
            }
          }),
        };
      }
    default:
      return selectTree;
  }
};

export default selectTreeReducer;
