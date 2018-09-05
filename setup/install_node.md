# Installing Node.js on Ubuntu
This guide provides information on installing the project specific version of Ruby on Ubuntu. Guide has been tested on Ubuntu 16.04 but should work for more recent versions as well.

Assumes:
- Has wget installed
- Has su privileges
- Using bash. If you are using a different shell, please use the configuration files specific to your shell when following this guide (zsh, fish, etc.).

## Install NVM
NVM is a tool for installing and managing different node versions on the same machines.

- Install the dependencies:
    ```bash
    $ sudo apt-get install build-essential libssl-dev
    ```

- Download the installation script:
    ```bash
    $ cd
    $ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh
    ```

- Run the script with BASH or the shell of your choice:
    ```bash
    $ bash install_nvm.sh
    ```
- if you're using a shell other than bash, you may need to append these lines to your shell configuration (e.g. .zshrc):
    ```bash
    export NVM_DIR="/home/theasianpianist/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
    ```

- Source your shell configuration file:
    ```bash
    $ source ~/.profile
    ```

*You are now ready to install node*

## Install Node
- At the time of writing, this application uses v8.4.0, although the most recent version should still work in the future:
    ```bash
    $ nvm install 8.4.0
    ```
    NVM automatically uses the most recently installed version. Double check the currently used version with `$ node -v`


## Additional Notes
- To install the newest available version of node:
    ```bash
    $ nvm install node
    ```
