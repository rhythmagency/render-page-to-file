angular.module("umbraco").controller("RenderPageToFile",
    function ($rootScope, $scope, $http, dialogService, editorState) {

        // Variables.
        $scope.inProgress = false;
        $scope.wasError = false;
        $scope.wasSuccess = false;

        // Stores the current page as HTML.
        $scope.store = function () {

            // Variables.
            var pageId = editorState.current.id;
            var path = $scope.model.config.path;
            var url = "/umbraco/backoffice/RenderPageToFile/Render/RenderPage";

            // Attempt to store to file.
            $scope.wasError = false;
            $scope.wasSuccess = false;
            $scope.inProgress = true;
            $http.post(url, { pageId: pageId, path: path }).success(function (data) {
                $scope.inProgress = false;
                $scope.wasSuccess = data.Success;
                $scope.wasError = !data.Success;
                if ($scope.wasError) {
                    $scope.errorMessage = data.FailureReason;
                }
            }).error(function () {
                $scope.inProgress = false;
                $scope.wasError = true;
                $scope.wasSuccess = false;
            });

        };

    });