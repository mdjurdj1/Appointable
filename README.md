# Welcome to Appointment Manager!

A simple RoR-based appointment manager which allows users to keep track of appointments, contacts, and locations.

* Omniauth session functionality - login from Facebook!
* Secure authentication with Devise.
* Save appointments with associated contact and location info.
* Search through contacts and locations by name, with full CRUD functionality.

## Video Walkthrough

![Imgur](http://i.imgur.com/0qgnpzE.png)


## Installation

```
cd appointment-manager
bundle install
```

## Facebook Login

This app supports Facebook login via omniauth gem. To utilize this functionality, you'll need to take the following steps:

1. Create an application in the [Facebook Developer Console](https://developer.facebook.com/) and go to the settings part of the Dashboard (skip quick setup)
2. At the top of the **Basic** tab, you'll see the name of the app, the API version, the **App ID**, and the **App Secret**.  You'll want to add the App ID and the App Secret to the `.env` file in your project, like so... In the root of your project, run `nano .env`, and add the following:
```
FACEBOOK_KEY="App ID here"
FACEBOOK_SECRET="App Secret here"
```
Press `CTRL + O` to save, hit return to save the file as `.env`, press `CTRL + X` to exit nano.
3. Drop into your `rails console` to make sure you've got them hooked up: run `ENV["FACEBOOK_KEY"]` and you should see your App ID **NOTE:** If this isn't working, make sure that you have the `gem 'dotenv-rails, groups: [:development, :test]` in your Gemfile **beneath** `gem rails`.
4. **Before making any commits:** Make sure you that you have `.env` in your `.gitignore` file.
5. Click on the **Advanced** Tab and scroll down to the section labeled **Client OAuth Settings** and find the filed labeled **Valid OAuth Redirect URLs**.  You'll want to add `http://localhost:3000/users/auth/facebook/callback`.

Now you should be able to run
```
rails server
```
and test out the app.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
