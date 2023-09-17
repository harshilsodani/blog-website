# Digivarta – Technology Blog Website

Digivarta is a versatile technology blog website that empowers users to create and share insightful articles on various tech topics. With a focus on security and accessibility, Digivarta offers the following key features:

## Features

### 1. Create Technology Blogs
- **Author Your Insights**: Share your knowledge and insights about technology trends, programming, and more.
- **Rich Content**: Create content with formatted text (images, and code snippets will be added in future versions).

### 2. Secure Editing and Deletion
- **Password Protection**: Assign a password to each blog post for authorization when editing or deleting.
- **Enhanced Security**: Ensure the safety of your content with an extra layer of security.

### 3. Responsive Design
- **Optimized Viewing**: Enjoy a seamless experience on devices of all sizes.
- **Mobile-Friendly**: Access and navigate the website conveniently on smartphones and tablets.

### 4. Dynamic Content
- **Live Updates**: Dynamic rendering of content using EJS templates.

## Technologies Used

Digivarta is built using modern technologies to deliver a robust and user-friendly experience:

- **Node.js**: The server-side JavaScript runtime for building the backend.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for efficient data storage.
- **EJS (Embedded JavaScript)**: The templating engine for rendering dynamic content.

## Project Structure

Below is the structure of your Digivarta project:

- **Images**: This directory may contain images used in your blog posts or other parts of the website.

- **public**: This directory is typically used for serving static assets like CSS, JavaScript, and images to the client-side.

- **views**: Contains the EJS templates used for rendering HTML pages. Here's a breakdown of the templates:

     - **partials**: This subdirectory contains partial EJS templates that can be reused across multiple pages for consistency. Examples include the header and footer.

     - **footer.ejs**: The template for the website's footer section.

   - **header.ejs**: The template for the website's header section.

   - **about.ejs**: The template for the "About" page.

   - **compose.ejs**: The template for composing new blog posts.

   - **contact.ejs**: The template for the "Contact" page.

   - **error.ejs**: The template for displaying error messages.

   - **home.ejs**: The template for the homepage where blog posts are displayed.

   - **modify.ejs**: The template for editing existing blog posts.

   - **post.ejs**: The template for displaying individual blog posts.

- **.gitignore**: This file specifies which files and directories should be ignored by Git, typically build artifacts, dependencies, and sensitive configuration files.

- **app.js**: The main application file that configures the Express.js web server and sets up routes and middleware.

- **package-lock.json**: A file generated by npm that locks the versions of installed packages, ensuring consistent installations across environments.

- **package.json**: The npm package configuration file, specifying project dependencies and metadata.

This structured layout helps keep your project organized, with clear separation between static assets, templates, server-side code, and configuration files. You can customize and expand on this structure as your project evolves.

## Get Started

To explore Digivarta and start creating technology blogs, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/harshilsodani/blog-website.git
```


3. Install dependencies:
```bash
npm install
```


5. Set up environment variables for database connection and other configurations.

6. Start the server:
```bash
npm start
```


8. Access the website in your browser: `http://localhost:3000`

## Contributing

Contributions to Digivarta are welcome! If you'd like to contribute, please follow the guidelines in the project's [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
