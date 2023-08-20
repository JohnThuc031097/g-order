import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";

import meatIcon from "static/category-meat.svg";
import hotpotIcon from "static/category-hotpot.svg";
import vegetableIcon from "static/category-vegetable.svg";
import seafoodIcon from "static/category-seafood.svg";

import logo from "static/logo.png";
import { Category, CategoryId } from "types/category";
import { Product, Sale, PercentSale, Variant } from "types/product";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice, getDummyImage } from "utils/product";
import { wait } from "utils/async";

export const userState = selector({
  key: "user",
  get: () => getUserInfo({}).then((res) => res.userInfo),
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => [
    { id: "meat", name: "Thịt", icon: meatIcon },
    { id: "hotpot", name: "Lẩu", icon: hotpotIcon },
    { id: "seafood", name: "Hải sản", icon: seafoodIcon },
    { id: "vegetable", name: "Rau củ", icon: vegetableIcon },
  ],
});

const description = `Mô tả sản phẩm`;

export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    const variants: Variant[] = [
      // {
      //   key: "size",
      //   label: "Kích cỡ",
      //   type: "single",
      //   default: "m",
      //   options: [
      //     {
      //       key: "s",
      //       label: "Nhỏ",
      //       priceChange: {
      //         type: "percent",
      //         percent: -0.2,
      //       },
      //     },
      //     {
      //       key: "m",
      //       label: "Vừa",
      //     },
      //     {
      //       key: "l",
      //       label: "To",
      //       priceChange: {
      //         type: "percent",
      //         percent: 0.2,
      //       },
      //     },
      //   ],
      // },
      // {
      //   key: "toping",
      //   label: "Topping",
      //   type: "multiple",
      //   default: ["t1", "t4"],
      //   options: [
      //     {
      //       key: "t1",
      //       label: "Trân châu",
      //       priceChange: {
      //         type: "fixed",
      //         amount: 5000,
      //       },
      //     },
      //     {
      //       key: "t2",
      //       label: "Bánh flan",
      //       priceChange: {
      //         type: "fixed",
      //         amount: 10000,
      //       },
      //     },
      //     {
      //       key: "t3",
      //       label: "Trang trí",
      //       priceChange: {
      //         type: "percent",
      //         percent: 0.15,
      //       },
      //     },
      //     {
      //       key: "t4",
      //       label: "Không lấy đá",
      //       priceChange: {
      //         type: "fixed",
      //         amount: -5000,
      //       },
      //     },
      //   ],
      // },
    ];
    return [
      {
        id: 1,
        name: "Ba chỉ bò mỹ nhúng lẩu",
        price: 35000,
        stock: 20,
        image: getDummyImage("1Sq2_O6yCvzMnza7wN4wNnVEVGhQknNsR"),
        description,
        categoryId: ["meat"],
        variants,
      },
      {
        id: 2,
        name: "Thăn bò mỹ sốt Obathan",
        price: 45000,
        stock: 10,
        image: getDummyImage("1CBO9JnKqAU1_k8FoCDDkzDcBuF3aCfcG"),
        description,
        categoryId: ["meat"],
        variants,
      },
      {
        id: 3,
        name: "Lẩu nấm",
        price: 30000,
        stock: 5,
        image: getDummyImage("1ADXbVMbIvxGnFkMn5KeXoMXpFmCODUKt"),
        description,
        categoryId: ["hotpot"],
        variants,
      },
      {
        id: 4,
        name: "Lẩu TomYum",
        price: 28000,
        stock: 0,
        image: getDummyImage("1zYLuUtLRbHV5mW1xFlwdANhGWcJ8VQXi"),
        description,
        categoryId: ["hotpot"],
        variants,
      },
      {
        id: 5,
        name: "Mực trứng",
        price: 35000,
        stock: 100,
        image: getDummyImage("16UAR118RH9moHS0jbCiiN2UP7UB6YUST"),
        description,
        categoryId: ["seafood"],
        variants,
      },
      {
        id: 6,
        name: "Tôm thẻ",
        price: 38000,
        stock: 30,
        image: getDummyImage("1XnjMOvYloLGYKCRzj6shmGK8rudSgeYY"),
        description,
        categoryId: ["seafood"],
        variants,
      },
      {
        id: 7,
        name: "Cải thìa",
        price: 32000,
        stock: 2,
        image: getDummyImage("1PSkji7E1H-p-YBDt6g8PDDQRkdCv2bPA"),
        description,
        categoryId: ["vegetable"],
        variants,
      },
      {
        id: 8,
        name: "Ngọn su su",
        price: 25000,
        stock: 1,
        image: getDummyImage("1dCSonB0SwpzbpVs6lHZOW70H_EqXfdKR"),
        description,
        categoryId: ["vegetable"],
        variants,
      },
    ];
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.sale);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "meat",
});

export const productsByCategoryState = selectorFamily<Product[], CategoryId>({
  key: "productsByCategory",
  get:
    (categoryId) =>
      ({ get }) => {
        const allProducts = get(productsState);
        return allProducts.filter((product) =>
          product.categoryId.includes(categoryId)
        );
      },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total + item.quantity * calcFinalPrice(item.product, item.options),
      0
    );
  },
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: 2,
      image: logo,
      title: "Giảm 50% lần đầu mua hàng",
      content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  },
});

export const storesState = atom<Store[]>({
  key: "stores",
  default: [
    {
      id: 1,
      name: "VNG Campus Store",
      address:
        "Khu chế xuất Tân Thuận, Z06, Số 13, Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.741639,
      long: 106.714632,
    },
    {
      id: 2,
      name: "The Independence Palace",
      address:
        "135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779159,
      long: 106.695271,
    },
    {
      id: 3,
      name: "Saigon Notre-Dame Cathedral Basilica",
      address:
        "1 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779738,
      long: 106.699092,
    },
    {
      id: 4,
      name: "Bình Quới Tourist Village",
      address:
        "1147 Bình Quới, phường 28, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.831098,
      long: 106.733128,
    },
    {
      id: 5,
      name: "Củ Chi Tunnels",
      address: "Phú Hiệp, Củ Chi, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 11.051655,
      long: 106.494249,
    },
  ],
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    // Get the current location from the locationState atom
    const location = get(locationState);

    // Get the list of stores from the storesState atom
    const stores = get(storesState);

    // Calculate the distance of each store from the current location
    if (location) {
      const storesWithDistance = stores.map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long
        ),
      }));

      // Sort the stores by distance from the current location
      const nearbyStores = storesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      return nearbyStores;
    }
    return [];
  },
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const selectedStoreState = selector({
  key: "selectedStore",
  get: ({ get }) => {
    const index = get(selectedStoreIndexState);
    const stores = get(nearbyStoresState);
    return stores[index];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "0337076898";
    }
    return false;
  },
});
