import os

from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class LicenseContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    licence_file_extenstion = '.reg'
    licence_file_path = os.path.join(_base.test_cmdline_commands, 'licenses')
    license_file = os.path.join(licence_file_path, 'licenses' + licence_file_extenstion)
    # -----------------------------------------------------------------------------------------------------------------]
    license_key = 'URr8cre8TEaNpqpyMbAipi5h4jZDdSsnhoP5Pl/' \
                  'WzgkoYLedtgR7bj0MM5vNk4nOSVRzBA79C2/' \
                  'oQT+CJ6bmhA==:0:{"Databases":[{"DbType":"Redshift"}],"CustomerName":"testCustomer"}'
    # -----------------------------------------------------------------------------------------------------------------]
    license_default_user     = 'testCustomer'
    license_default_expired  = 'Unlimited'
    license_default_trial    = 'false'
    license_default_features = 'Unlimited'
    license_datasunrise_user    = 'test'
    license_datasunrise_expired = '2020-12-31'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    licenses_list_template = sample('''\
        {}
        OK
    ''')
    license_template       = sample('''\
        Registered to        : %s
        Expired              : %s
        Trial                : %s
        Features             : %s
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    column_width = 21

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    upd_license   = 'updateLicense -key %s'
    upd_licenses  = 'updateLicenses -file %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_licenses = 'showLicenses'
    show_license  = 'showLicense -id %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_license   = 'delLicense -id %d'

    #
    #
    # MESSAGES
    # =================================================================================================================]
    msg_arent_such     = "There aren't such %s"
    msg_werent_deleted = "The %s weren't deleted"

    @classmethod
    def create_license_sample(cls, count):
        if count is 0:
            return

        licenses = []

        for i in range(0, count):
            user     = cls.license_default_user    if i is not count - 1 else cls.license_datasunrise_user
            expired  = cls.license_default_expired if i is not count - 1 else cls.license_datasunrise_expired
            trial    = cls.license_default_trial
            features = cls.license_default_features
            license  = cls.license_template % (user, expired, trial, features)
            licenses.append(license)

        _sample = cls.licenses_list_template.format(''.join(licenses))

        return _sample

    @classmethod
    def count_licenses(cls, list):
        count = 0

        for line in list:
            if ('%%-%ds:' % cls.column_width) % 'ID' in line:
                count += 1

        return count
