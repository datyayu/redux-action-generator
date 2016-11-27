import { constantCase } from 'change-case';


export function ActionClass() {
    return function(target: Function) {
        const methods = getInstanceMethods(target);
        const className = target.name;

        // Generate the boilerplate stuff for each method.
        methods.forEach(method => {
          const actionType = constantCase(method);
          const actionName = `[${className}] ${actionType}`;

          // Add action creator
          target.prototype[method] = function (actionPayload) {
            return {
              type: actionType,
              payload: actionPayload,
            };
          }

          // Add action type
          target[actionType] = actionName;
        });
    }
}


// Get instance methods from a class
function getInstanceMethods(target: any): Array<string> {
    let methods = [];

    // For each member of the class
    for (const member in target.prototype) {
        // Get only functions
        if (typeof target.prototype[member] == "function") {
            // Make sure it isn't inherited
            if (target.prototype.hasOwnProperty(member)) {
                methods.push(member);
            }
        }
    }

    return methods;
}