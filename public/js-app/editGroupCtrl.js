var app = angular.module('app2020');

app.controller('EditGroupCtrl', ['$http', '$uibModalInstance', 'editGroupOptions', 'common', function($http, $uibModalInstance, editGroupOptions, common) {
    var ctrl = this;
    ctrl.opt = editGroupOptions;
    ctrl.groups = [];

    ctrl.persons = [];
    $http.get('/persons').then(
        function(rep) {
            ctrl.persons = [];
            ctrl.opt.data.persons = [];
            rep.data.data.forEach(person => {
                person.groups.forEach(group => {
                    if (group._id === ctrl.opt.data._id) {
                        ctrl.persons.push(person);
                        ctrl.opt.data.persons.push(person);
                    }
                });
            });
        },
        function(err) {}
    );

    ctrl.save = function() { $uibModalInstance.close('save'); };
    ctrl.delete = function() {
        if (ctrl.persons.length > 0) {
            common.alert('alert-danger', 'Nie możesz usunąć niepustej grupy');
        } else {
            common.confirm({ title: 'Uwaga!', body: 'Czy na pewno chcesz skasować ten rekord?', noOk: false, noCancel: false }, function(answer) {
                if(answer) {
                    $uibModalInstance.close('delete');
                }
            });
        }
    };

    ctrl.cancel = function() { $uibModalInstance.dismiss('cancel'); };
}]);