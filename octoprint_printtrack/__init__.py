# coding=utf-8
from __future__ import absolute_import
import octoprint.plugin


class PrintTrackPlugin(octoprint.plugin.EventHandlerPlugin, octoprint.plugin.SettingsPlugin, octoprint.plugin.TemplatePlugin, octoprint.plugin.AssetPlugin):
	def get_settings_defaults(self):
		return dict(
			titleAppend=False,
			titlePrepend=False,
			statusSeperator="-",
			statusOffline="Offline",
			statusConnecting="Connecting",
			statusOperational="Operational",
			statusPrinting="Printing",
			statusPaused="Paused",
			statusClosed="Closed",
			statusError="Error!",
			statusClosedWithError="Closed With Error",
			statusCancelling="Cancelling",
			statusPausing="Pausing",
			statusResuming="Resuming",
			statusFinishing="Finishing",
			statusOther="Other")

	def get_template_configs(self):
		return [dict(type="settings", custom_bindings=False)]

	def get_assets(self):
		return dict(js=["js/print_track.js"])

	def get_state_id(self):
		return self._printer.get_state_id()

	def on_event(self, event, payload):
		if event == "ClientOpened":
			self._plugin_manager.send_plugin_message(
				self._identifier, self.get_state_id())

	def get_version(self):
		return self._plugin_version

	def get_update_information(self):
		return dict(
			printtrack=dict(
				displayName="Print Track",
				displayVersion=self._plugin_version,
				type="github_release",
				current=self._plugin_version,
				user="ElectricSquid",
				repo="OctoPrint-PrintTrack",
				pip="https://github.com/ElectricSquid/OctoPrint-PrintTrack/archive/{target_version}.zip"
			)
		)


__plugin_name__ = "Print Track"
__plugin_implementation__ = PrintTrackPlugin()

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = PrintTrackPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

