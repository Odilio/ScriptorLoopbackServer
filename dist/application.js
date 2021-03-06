"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path = require("path");
const sequence_1 = require("./sequence");
const authentication_1 = require("@loopback/authentication");
const keys_1 = require("./keys");
const hash_password_bcryptjs_1 = require("./services/hash.password.bcryptjs");
const user_services_1 = require("./services/user-services");
const jwt_services_1 = require("./services/jwt-services");
const jwt_strategy_1 = require("./authentication-strategies/jwt-strategy");
exports.PackageKey = core_1.BindingKey.create('application.package');
const pkg = require('../package.json');
class MobbyPlatformServersideApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    setUpBindings() {
        // Bind package.json to the application context
        this.bind(exports.PackageKey).to(pkg);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        authentication_1.registerAuthenticationStrategy(this, jwt_strategy_1.JWTAuthenticationStrategy);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_services_1.JWTService);
        // // Bind bcrypt hash services
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(hash_password_bcryptjs_1.BcryptHasher);
        this.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(user_services_1.MyUserService);
    }
    constructor(options = {}) {
        super(options);
        this.setUpBindings();
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.component(authentication_1.AuthenticationComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.MobbyPlatformServersideApplication = MobbyPlatformServersideApplication;
//# sourceMappingURL=application.js.map