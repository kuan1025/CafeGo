# IFN666_25se1 Assessment 02 Submission

**Student name:**  YU-KUAN, LIN

**Student ID:** n11233885

# Response to marking criteria

## (API) Core: Application architecture (1 mark)

- **One line description:** layered architecture: controllers, models, middleware, routes
- **Video timestamp:** 5:00
- **Relevant files**
   - /server/src/

## (API) Core: Endpoints (2 marks)

- **One line description:** Endpoints for User, Roles, Product, ExtraOption, and Category (5 each), plus login and register (2 total)
- **Video timestamp:**  2:18, 5:04
- **Relevant files**
   - /server/src/routes/
   - API-collection.json

## (API) Core: Data model (3 marks)

- **One line description:** Entities: Product, Category, extraOption, Role and User
- **Video timestamp:** 9:44
- **Relevant files**
   - /server/src/models/Category.js
   - /server/src/models/extraOption.js
   - /server/src/models/Product.js
   - /server/src/models/Role.js
   - /server/src/models/User.js

## (API) Core: Data interface (3 marks)

- **One line description:** Controllers: Product, Category, extraOption, Role, User and Auth 
- **Video timestamp:** 6:13
- **Relevant files**
   - /server/src/controllers/authController.js
   - /server/src/controllers/categoryController.js
   - /server/src/controllers/extraOptionController.js
   - /server/src/controllers/productController.js
   - /server/src/controllers/roleController.js
   - /server/src/controllers/userController.js

## (API) Core: Deployment to web server (3 marks)

- **One line description:** using Caddy for reverse-proxy and systemd for auto-start. available at n11233885.ifn666.com/cafeGo/ (frontend) and n11233885.ifn666.com/cafeGo/api (REST API); systemd launches the server.js node process; All demos are showcased using the domain n11233885.ifn666.com
- **Video timestamp:** 9:34, 00:00
- **Relevant files**
   - Caddyfile

## (API) Core: API testing with Hoppscotch (3 marks)

- **One line description:** used Postman. every endpoint has sample payloads. used URL and env variables.
- **Video timestamp:**  2:18
- **Relevant files**
   - API-collection.json

## (API) Additional: Authentication (3 marks)

- **One line description:** implemented using JWT. routes are protected
- **Video timestamp:** 0:30, 5:20, 5:57, 7:33
- **Relevant files**
   - /server/src/config/jwt.js
   - /server/src/middleware/authMiddleware.js
   - /server/src/routes/auth.js
   - /server/src/routes/category.js
   - /server/src/routes/extraOption.js
   - /server/src/routes/index.js
   - /server/src/routes/products.js
   - /server/src/routes/role.js
   - /server/src/routes/user.js

## (API) Additional: Query filtering (3 marks)

- **One line description:** The endpoint for "get all" products supports filtering by category and sorting by price
- **Video timestamp:** 6:14
- **Relevant files**
   - /server/src/controllers/productController.js

## (API) Additional: Pagination (3 marks)

- **One line description:** get all products has pagination
- **Video timestamp:** 1:22, 6:14
- **Relevant files**
   - /server/src/controllers/productController.js
   - /server/src/utils/generatePaginationLinks.js

## (API) Additional: Role-based Access Control (3 marks)

- **One line description:** RBAC is implemented using the roles defined in the user model and secured with JWT encryption
- **Video timestamp:** 0:24 ~ 1:08, 2:33 ~ 3:28, 05:16, 05:56
- **Relevant files**
   - /server/src/config/jwt.js
   - /server/src/middleware/authMiddleware.js
   - /server/src/routes/auth.js
   - /server/src/routes/category.js
   - /server/src/routes/extraOption.js
   - /server/src/routes/index.js
   - /server/src/routes/products.js
   - /server/src/routes/role.js
   - /server/src/routes/user.js

## (API) Additional: Custom middleware (3 marks)

- **One line description:**  To support image uploads to the /uploads folder, I created a custom middleware using Multer
- **Video timestamp:** Source code : 5:41, 6:06, Demo : 1:59 ~ 2:17
- **Relevant files**
   - /server/src/routes/products.js
   - /server/src/middleware/imageStorage.js
   - /server/server.js
   - uploads

---


## (Client) Core: Application architecture (3 marks)

- **One line description:** Two main component folders: admin/components/ and customer/components/, and two main page folders: /admin/pages/ and customer/pages/
- **Video timestamp:** 7:41 ~ 8:20
- **Relevant files**
   - /client/src/admin/compinents/      : contains admin related components
   - /client/src/admin/pages/           : contains admin related pages 
   - /client/src/customer/compinents/   : contains customer related components
   - /client/src/customer/pages/        : contains customer related pages 
   - .env                               : Is used for local development
   - .env.production                    : Is used for the deployment environment at n11233885.ifn666.com

## (Client) Core: User interface design (3 marks)

- **One line description:** Simple UI built with Mantine components, including built-in layout elements for clean and responsive design
- **Video timestamp:** 00:00 ~ 2:22 
- **Relevant files**
   - /client/src/admin/pages/                   : for admin management pages
   - /client/src/customer/pages/home            : main pages
   - /client/src/customer/components/Header.jsx : login, logout, and sign-in functionalities are embedded across pages for easy access and user session management
   - /client/src/admin/compinents/              : for bespoke pruduct management components

## (Client) Core: React components (3 marks)

- **One line description:** components for CreateProductForm, EditProductModal(create/update); same again for Category
- **Video timestamp:** demo : 1:47  create/edit product; 1:08 create/edit category. Source code from 8:36 ~ 9:20
- **Relevant files**

   - /client/src/admin/components/CreateCategoryForm.jsx
   - /client/src/admin/components/CreateProductForm.jsx
   - /client/src/admin/components/EditCategoryForm.jsx
   - /client/src/admin/components/EditProductModal.jsx


## (Client) Core: State management (3 marks)

- **One line description:** extensive use of useState and useContext
- **Video timestamp:**  7:52 (useContext) 8:40 (useState-category) 8:50 (useState-product)
- **Relevant files**
   - **useState**
   - /client/src/admin/components/CreateProductForm.jsx
   - /client/src/admin/components/CreateCategoryForm.jsx
   - /client/src/admin/components/EditCategoryForm.jsx
   - /client/src/admin/components/EditProductModal.jsx
   - **useContext**
   - /client/src/customer/components/Header.jsx
   - /client/src/customer/context/AuthContext.jsx

## (Client) Core: API integration (3 marks)

- **One line description:** integrated with REST API. nearly all features
- **Video timestamp:** all throughout video
- **Relevant files**
   - /client/src/admin/components/CreateProductForm.jsx
   - /client/src/admin/components/CreateCategoryForm.jsx
   - /client/src/admin/components/EditCategoryForm.jsx
   - /client/src/admin/components/EditProductModal.jsx
   - /client/src/customer/components/Header.jsx
   - /client/src/customer/context/AuthContext.jsx
   - /client/src/admin/pages/ViewCategories.jsx
   - /client/src/admin/pages/ViewProducts.jsx


## (Client) Additional: Authentication (3 marks)

- **One line description:** via JWT workflow with REST API
- **Video timestamp:** from 0:29 in the client demo
- **Relevant files**
   - /client/src/customer/components/Header.jsx
   - /client/src/customer/context/AuthContext.jsx
   - /client/src/customer/pages/Home.jsx
   

## (Client) Additional: Input validation (3 marks)

- **One line description:** Client side input validation using JavaScript with  error messages shown to users
- **Video timestamp:**  0:13 (sign-up), 1:51 (create a product) source code : 8:41 (create a category), 8:49(create a product)
- **Relevant files**
   - /client/src/admin/components/CreateProductForm.jsx
   - /client/src/admin/components/CreateCategoryForm.jsx
   - /client/src/admin/components/EditCategoryForm.jsx
   - /client/src/admin/components/EditProductModal.jsx
   - /client/src/customer/components/Header.jsx

## (Client) Additional: Rate limiting (3 marks)

- **One line description:** Integrated server-side endpoints using Axios and applied client-side rate limiting through Axios configuration
- **Video timestamp:**  8:20(client-side) 4:40(server-side)
- **Relevant files**
   - /client/src/utils/axios.js
   - /server/server.js

## (Client) Additional: Search and Sort (3 marks)

- **One line description:** Category dropdown filters specific products, while price sorting controls the display order of products
- **Video timestamp:** 1:30 , source code : 9:25
- **Relevant files**
   - /client/src/admin/pages/ViewProducts.jsx

## (Client) Additional: Pagination (3 marks)

- **One line description:** list of products is paginated (on the server side)
- **Video timestamp:** 1:21, source code from 9:18 to 9:33
- **Relevant files**
   - /client/src/admin/pages/ViewProducts.jsx
   - /client/src/utils/parsePagination.js

