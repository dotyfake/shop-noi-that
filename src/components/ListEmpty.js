import React from 'react';
import { Grid } from '@nextui-org/react';
import { EmptyProduct } from '~/components';
const ListEmpty = () => {
    return (
        <div>
            <Grid.Container gap={2} justify="center">
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
                <Grid xs={6} sm={3}>
                    <EmptyProduct />
                </Grid>
            </Grid.Container>
        </div>
    );
};

export default ListEmpty;
