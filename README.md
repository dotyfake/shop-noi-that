## Thông tin dự án

Dự án là một webapp thương mại điện tử nội thất, giúp người dùng mua hàng trực tuyến.

### Các chức năng chính của dự án:

-   Tra cứu sản phẩm trên trang chủ.
-   Tra cứu sản phẩm qua chức năng tìm kiếm.
-   Lọc sản phẩm theo loại.
-   ...

---

## Công nghệ sử dụng trong dự án

### Frontend

-   Dự án được tạo từ CRA(create-react-app).
-   Thư viện CSS sử dụng styled-components và thư viện NextUI.
-   Định tuyến của trang sử dụng react-router-dom.
-   Lazyloading với react-lazy-load-image-component.
-   SEO với thư viện react-helmet.
-   Slide sử dụng thư viện swiper.
-   Popper và tooltip sử dụng tippyjs.
-   Icon sử dụng react-icons.

### State management

-   State management sử dụng redux.

### Backend

-   Serverless nodejs runtime Netlify.
-   API của trang được viết từ **function** của Netlify dựa trên Notion API.
-   Database: Sử dụng Notion Database.

### CMS

-   CMS: notion.

---

## Cấu trúc thư mục trong dự án

```
shop-noi-that
│   README.md
│   netlify.toml (build settings, deploy settings, and environment variables)
│   ...
└───functions (Để viết code Node.js, trong dự án này chỉ dùng để viết API)
└───src
    └───assets (Chứa tài nguyên của trang web)
    └───Commponents
    └───layout
    └───pages
    └───hooks (custom hooks)
    └───store (State management)
    ...
```
