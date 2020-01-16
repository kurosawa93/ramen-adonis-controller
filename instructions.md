
# Thank you for installing ramen-adonis-controller

  

## How to Use

  

In order to use this package in your project, you will need to add the following lines in your `start/app.js` files inside the `providers` property.

  

```

  

const providers = [

  

...

  

...

  

...

  

'ramen-adonis-auth/providers/RamenCrudProvider', // for basic CRUD operations controller

  

'ramen-adonis-auth/providers/RamenFileProvider', // for file related controller

  

]

  

```

  

  

### CRUD Controller

In your project, after adding the provider in your `start/app.js` file, you can create and extend your project controller to `ramen` provided controllers like below;

```
const RamenCrudController = use('Ramen/CrudController')


class YourAppController extends RamenCrudController {

	constructor() {

		super(yourModel);

	}
	
}
```

there is one parameters which you must be add when you called parent constructor;

-  **yourModel**: this is your object model class which related to the current controller. For example, if your create a BookController, then the object must be Book. Of course the naming is up to your liking, but please keep in mind that one controller cannot contain more than one object models. So please make sure to define your code structure accordingly.

	And also, please note that currently only object model from [ramen-adonis-datamodel](https://github.com/kurosawa93/ramen-adonis-datamodel) is supported. 
	
### File Controller

In your project, after adding the provider in your `start/app.js` file, you can create and extend your project controller to `ramen` provided controllers for file like below;

```
const RamenFileController = use('Ramen/FileController')


class YourAppController extends RamenCrudController {
}
```

Here, you only need to extend the class and you can already use the function in the parent class from your `start/routes.js` file.