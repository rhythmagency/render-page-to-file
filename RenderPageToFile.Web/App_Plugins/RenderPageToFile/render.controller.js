angular.module("umbraco").controller("RenderPageToFile",
    function ($rootScope, $scope, $http, dialogService, editorState) {

        // Variables.
        var defaultError = "An error occurred.";
        var url = "/umbraco/backoffice/RenderPageToFile/Render/RenderPage";

        // Initialize status variables.
        $scope.inProgress = false;
        $scope.wasError = false;
        $scope.wasSuccess = false;
        $scope.errorMessage = null;

        // Stores the current page as a file.
        $scope.store = function () {

            // Variables.
            var pageId = editorState.current.id;
            var path = $scope.model.config.path;
            var data = {
                PageId: pageId,
                FilePath: path
            };

            // Reset status variables.
            $scope.wasError = false;
            $scope.wasSuccess = false;
            $scope.inProgress = true;
            $scope.errorMessage = null;

            // Attempt to store to file.
            $http.post(url, data).success(handleSuccess).error(handleError);

        };

        // Handles a successful request.
        function handleSuccess(data) {
            $scope.inProgress = false;
            $scope.wasSuccess = data.Success;
            $scope.wasError = !data.Success;
            if ($scope.wasError) {
                $scope.errorMessage = data.FailureReason || defaultError;
            }
        }

        // Handles an error with the request.
        function handleError() {
            $scope.inProgress = false;
            $scope.wasError = true;
            $scope.wasSuccess = false;
            $scope.errorMessage = defaultError;
        }

    });