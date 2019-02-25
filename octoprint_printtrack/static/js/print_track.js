$(function () {
    function PrintTrackViewModel(parameters) {
        var self = this;
        self.settings = parameters[0];
        loaded = false;

        self.onAllBound = function () {
            self.default_title = document.title;
        }

        self.onBeforeBinding = function () {
            loaded = true;
        }

        self.onDataUpdaterPluginMessage = function (plugin, state) {
            if (plugin != "printtrack") {
                return;
            }
            self._update(state);
        }

        self.onEventPrinterStateChanged = function (payload) {
            self._update(payload.state_id);
        }

        self.changeTitle = function (text) {
            if (self.settings.settings.plugins.printtrack.titleAppend()) {
                text += " " + self.settings.settings.plugins.printtrack.statusSeperator() + " " + self.default_title;
            }
            if (self.settings.settings.plugins.printtrack.titlePrepend()) {
                text = self.default_title + " " + self.settings.settings.plugins.printtrack.statusSeperator() + " " + text;
            }
            
            document.title = text;
        }

        self._update = function (status) {
            if (loaded == false) { return }
            switch (status) {
                case "OFFLINE":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusOffline());
                    break;
                case "CONNECTING":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusConnecting());
                    break;
                case "OPERATIONAL":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusOperational());
                    break;
                case "PRINTING":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusPrinting());
                    break;
                case "PAUSED":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusPaused());
                    break;
                case "CLOSED":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusClosed());
                    break;
                case "ERROR":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusError());
                    break;
                case "CLOSED_WITH_ERROR":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusClosedWithError());
                    break;
                case "CANCELLING":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusCancelling());
                    break;
                case "PAUSING":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusPausing());
                    break;
                case "RESUMING":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusResuming());
                    break;
                case "FINISHING":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusFinishing());
                    break;
                case "OPEN_SERIAL":
                case "DETECT_SERIAL":
                case "DETECT_BAUDRATE":
                case "TRANSFERING_FILE":
                    self.changeTitle(self.settings.settings.plugins.printtrack.statusOther());
                    break;
                default:
                    self.changeTitle("Unknown");
            }
        }
    }
    OCTOPRINT_VIEWMODELS.push([PrintTrackViewModel, ["settingsViewModel"], []]);
});