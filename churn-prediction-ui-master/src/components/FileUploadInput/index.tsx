import { Grid } from '@mui/material';
import styles from './fileuploadinput.module.css';

type FileUploadInputProps = {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUploadInput = ({ onChange }: FileUploadInputProps) => {
	return (
		<Grid>
			<label className={styles.uploadLabel} htmlFor="upload-dataset">
				Upload Dataset
			</label>
			<input
				id="upload-dataset"
				type="file"
				accept=".csv"
				hidden
				onChange={onChange}
				onClick={(e: any) => (e.currentTarget.value = null)}
			/>
		</Grid>
	);
};

export default FileUploadInput;
