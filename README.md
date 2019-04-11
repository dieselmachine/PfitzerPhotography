# Pfitzer Photography
### Website Portfolio For Ursula Pfitzer's Industrial Photography

View a live prototype of the site at https://pfitzer-photography.herokuapp.com.

The admin site is viewable by visiting the repository's [admin site wiki page](https://github.com/Xoadra/PfitzerPhotography/wiki/Admin-Site).

**Please note:** The images used in the prototype website are neither mine nor Ursula's.

If you'd like to see the code for the prototype, make sure you are viewing the proto branch.

---

Pfitzer Photography is a full-stack web application for displaying and advertising one's photography as a portfolio.  It is divided into two sections: the public-facing website itself and the admin site accessible with admin credentials for CMS purposes.

The site uses both JavaScript and Python as a complete full-stack CMS solution.  React is used on the frontend to build out the UI, featuring SPA routing and asynchronous JavaScript for data fetching.  Django works most of the backend, providing the admin site that powers a variety of content management tools.  Server-side rendering is also implemented using a seperate Node.js process with Express to serve up the app with pre-loaded data.  A MySQL database is provisioned for content storage.

## Implementation

Deciding on the technologies to use for this site came down to a number of factors.  On top of effectively meeting the client's needs, it was important to also seek out learning opportunities and build upon what I already know.  This is how the decision to build a dual-language app with React and Django came about.

Prior to building this website, I did not know React, but did know a bit about JavaScript and the Angular framework.  I learned React alongside working on this site and made significant use of React's wealth of features.  Redux was also incorporated into the site's architecture as well as server-side rendering which offered a unique and exciting experience tying React, Redux, Node.js, and Django together.

Choosing Django for the backend was due to two simple factors: I was already familiar with both Python and Django, and that Django comes with a boilerplate admin site that would allow me to get started building out the CMS immediately.  It was a clear choice right from the get-go and allowed me to balance working with technologies I already knew as well as adding to my knowledgebase.

## Architecture

The website is divided into two sections: the public-facing site and the admin site.  Both address different needs and operate somewhat separately from one another, but both are affected by the content that is added by the admin user and work together as a digital showcase of artistic work.

Below are a number of key architectural features, what they do, and how they work.  More information can be found by [checking out the wiki](https://github.com/Xoadra/PfitzerPhotography/wiki).

### Content Management

Creating user content for the website is done through the admin panel which is built out of Django's boilerplate admin site.  This is how content is added, changed, or removed from the site.  Examples of such user content include the backgrounds and self-description on the about page and gallery images in the gallery page.

Viewing the admin site can be done through the [admin site walkthrough](https://github.com/Xoadra/PfitzerPhotography/wiki/Admin-Site) in the wiki.

Further details on the code implementation of the admin site features will be added soon.

### Server-Side Rendering

While the web app functions much like a typical single page app, there are a number of differences to be aware of beneath the surface.

Django first receives the request, fetches the relevent page data for SEO, and then makes a post request to the Node.js Express server to prerender the application on the server.  Here, additional data is preloaded alongside the server-rendered React app before all of it is sent back to Django where it is then sent to the browser to be rendered.

Broken down, here's what happens with links to relevant code samples:

1. Initial page request is received by [Django's index route](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/meta/portfolio/views.py#L20) (see [/meta/portfolio/views.py](https://github.com/Xoadra/PfitzerPhotography/blob/master/meta/portfolio/views.py))
2. [Page data is fetched](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/meta/portfolio/views.py#L21) from the database for SEO
   * This is done by calling [Django's data route](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/meta/portfolio/views.py#L47) which handles all page data requests
3. Request is made to the Node.js Express server for prerendering (see [/view/express.js](https://github.com/Xoadra/PfitzerPhotography/blob/master/view/express.js))
4. [Data loading is performed](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/view/express.js#L28-L33) based on the page requested
   * Static routing is used on the server via the `Router` function (see [/view/app/pages/router.js](https://github.com/Xoadra/PfitzerPhotography/blob/master/view/app/pages/router.js))
   * Each React page component defines a static variable named `key` to inform `Router`
     * [View an example](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/view/app/pages/gallery/gallery.js#L20) by checking out the gallery page (see [/view/app/pages/gallery/gallery.js](https://github.com/Xoadra/PfitzerPhotography/blob/master/view/app/pages/gallery/gallery.js))
   * The static `key` object lets `Router` know which path and data belongs to each route
5. Server-rendered app and its data is [returned to Django as json](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/view/express.js#L36-L43)
6. App data is [embedded into HTML](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/meta/portfolio/views.py#L34-L43) via Django's template engine
7. Original request finishes and [returns to the client](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/meta/portfolio/views.py#L44)
8. Prerendered [app](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/static/index.html#L26) and [data](https://github.com/Xoadra/PfitzerPhotography/blob/c700841308e1af30f0e684893bc85428cf67b540/static/index.html#L31) are hydrated and React takes over (see [/static/index.html](https://github.com/Xoadra/PfitzerPhotography/blob/master/static/index.html) and [/view/index.js](https://github.com/Xoadra/PfitzerPhotography/blob/master/view/index.js))
9. Website viewing time!

This process is explained in greater detail [in the wiki section on server-side rendering](https://github.com/Xoadra/PfitzerPhotography/wiki/Server-Side-Rendering).

---

**Formal website and code documentation is ongoing!**

Documentation on the existing codebase is currently in the works!  Further documentation on the inner workings of the website including website management, code navigation, and other design decisions will continue to be added to the README and [the repository's wiki](https://github.com/Xoadra/PfitzerPhotography/wiki).

In the meantime, enjoy what I've shared thus far!
