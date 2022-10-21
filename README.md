# Bookshelf

A cozy personal library to keep track of your reading.

## About the Site
Bookshelf is designed to give readers a place to save the books they're interested in, along with notes about what they've read. It uses the MERN stack: React for the frontend, Node.js and Express.js for the backend, and MongoDB to keep track of users' data.

<img alt="Welcome page screenshot" src="https://user-images.githubusercontent.com/46614864/196831139-a90d60a0-3ee7-4b56-8148-3759e19cea10.png">





### APIs Used:
This project makes use of the following RESTful APIs made available by [Open Library](https://openlibrary.org/developers/api), a project by the [Internet Archive](https://archive.org/) aiming to document every book ever published:

* [Books](https://openlibrary.org/dev/docs/api/books)
* [Editions](https://openlibrary.org/dev/docs/api/books)
* [ISBN](https://openlibrary.org/dev/docs/api/books)
* [Authors](https://openlibrary.org/dev/docs/api/authors)
* [Covers](https://openlibrary.org/dev/docs/api/covers)
* [Search](https://openlibrary.org/dev/docs/api/search)

***

# Using Bookshelf

<img align="right" width="300" alt="Sign in screenshot" src="https://user-images.githubusercontent.com/46614864/196832462-b993b4fd-e53e-4a98-81b4-70e7181015d3.png">

<hr width="1">

## Logging In

Users must first create an account for themselves. Bookshelf uses Auth0 for authentication, ensuring that login data remains secure and allowing users to log in using their Google accounts if they choose. 

Once logged in, users will be brought to their dashboard. From here, they can access their bookshelves or search for new books.



<hr width="1">

## Dashboard

### User Shelves

All the user's bookshelves will be saved on their dashboard. New shelves will be added as new tabs under "My Shelves." 

<hr width="1">

<img alt="Dashboard screenshot" src="https://user-images.githubusercontent.com/46614864/196829375-c198676f-b6e7-4ff3-bf1f-7d6ad5fc2021.png">

<hr width="1">

<hr width="1">

<img width="400" align="right" alt="Book card screenshot" src="https://user-images.githubusercontent.com/46614864/197013202-f8f1258a-6836-45fa-8600-0f067b6cfc4d.png">

### Book Information

The books on the shelves will initially show simply the book cover and title, but will flip to show further information when hovered over.

<hr width="1">

<hr width="1">

<hr width="1">

<hr width="1">

<hr width="1">

<img alt="New shelf screenshot" align="left" width="600" src="https://user-images.githubusercontent.com/46614864/196829445-50f0c28c-26cb-48c7-b156-97bd707e2364.png">

<hr width="1">

### Adding Shelves

Users can add new bookshelves on their dashboard by clicking the "Add shelf" tag. This will open a modal allowing them to add shelf name and description.
New shelves will be added to the user's account and appear in their shelf tabs.

<hr width="1">

<hr width="1">

<img alt="Book search screenshot" align="right" width="400" src="https://user-images.githubusercontent.com/46614864/197016399-bd7c88dd-26ea-4ccb-94cf-40a49c71a3c8.png">


### Book Search

Users can search for books by author, title, or ISBN from their dashboard. If they know the ISBN of the book they wish to find they will be navigated to the book's specific page. If they search by author or title they will be navigate to a search page displaying the results.

<hr width="1">

<hr width="1">

<hr width="1">

## Search Page

The results of searches from the user dashboard will be displayed on the Search page. It also allows users to make further searches. Book results are displayed as cards with publishing details and the number of editions found.

<img alt="Search page screenshot" src="https://user-images.githubusercontent.com/46614864/197017542-2b6feec4-2aa0-4ac4-9515-12f87b4e2605.png">

<hr width="1">

## Book Editions Page

Clicking on a book card from the Search page will bring users to the Book Editions page. From here they can select the edition they want, which will navigate them to a specific Book page.

<img alt="Book editions page screenshot" src="https://user-images.githubusercontent.com/46614864/196829478-5fde75bb-52d1-4484-adfc-d82bab62543a.png">

<hr width="1">

## Specific Book Page

A specific Book page can be navigated to directly through an ISBN search, from a Book Editions page, or by selecting the book from the bookshelves displayed on the dashboard. It displays publishing information and the book's cover (if this is unavailable, a placeholder book cover image will be used instead).

### Adding to Shelves

Users can add books to their shelves by selecting the shelf on the right-hand side of the page.

<img alt="Specific book page screenshot" src="https://user-images.githubusercontent.com/46614864/196829454-ef35b8d3-40c9-4f8e-b772-2fcb39ee99d9.png">

<hr width="1">

<img align="right" width="600" alt="Book notes screenshot" src="https://user-images.githubusercontent.com/46614864/197024350-5310e717-b149-4f22-a7a2-f295682f6aa9.png">


### Adding Notes

Notes can be added to books on this page, as long as the user has already added the book to one or more of their shelves. Users can keep track of thoughts on their reading, favourite quotations, or reminders of passages they want to come back to.

<hr width="1">

<hr width="1">
